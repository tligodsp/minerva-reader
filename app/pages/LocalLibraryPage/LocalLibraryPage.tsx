import React, { useState, useEffect } from 'react';
import { LibraryPageTemplate } from '../../components/common/template';
import { LocalBook, Genre, Author } from '../../types';
import { BookList, BookListSection } from '../../components/common/organisms';
import * as Local from '../../utils/localUtils';
import styles from './LocalLibraryPage.module.scss';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Chips, { Chip } from 'react-chips';
import { FilterCard } from '../../components/common/molecules';
import { Colors } from '../../styles';
import { connect } from 'react-redux';
import { Theme } from '../../styles';

const TAB = {
	RECENTLY_READ: 'Recently Read',
	RECENTLY_ADDED: 'Recently Added',
  LOVED: 'Loved',
  WANT_TO_READ: 'Wishlist',
  ALL: 'All Downloaded',
  UNSYNCED: 'Unsynced Books'
}

const TAB_LIST = [
	TAB.RECENTLY_READ,
	TAB.RECENTLY_ADDED,
	TAB.LOVED,
  TAB.WANT_TO_READ,
  TAB.ALL,
  TAB.UNSYNCED
];

const useStyles = makeStyles(() =>
  createStyles({
    iconButton: {
      fontSize: "2rem"
    },
    iconButtonLight: {
      fontSize: "2rem",
      color: Theme.light.readerTextColor,
    },
    iconButtonDark: {
      fontSize: "2rem",
      color: Theme.dark.readerTextColor,
    },
  }),
);

const CustomChip = (props: any) => {
	return (
    <div
      className={styles['custom-chip-container']}
      style={{ backgroundColor: props.chipColor }}
    >
			{props.children}
			<div
				className={styles['chip-x-icon']}
				onClick={() => props.onRemove(props.index)}
			>&times;</div>
		</div>
	);
}

const LocalLibrary = (props) => {
  const [chosenTab, setChosenTab] = useState(TAB.RECENTLY_READ);
  const [books, setBooks] = useState<LocalBook[]>([]);
  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const [allAuthors, setAllAuthors] = useState<Author[]>([]);
  const [ genresFilter, setGenresFilter ] = useState<Genre[]>([]);
  const [ authorsFilter, setAuthorsFilter ] = useState<Author[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [ tabList, setTabList ] = useState<string[]>([]);
  const classes = useStyles();
  const { theme } = props.local;
  const { currentUser, isLoggedIn } = props.user;
  const [ renderAsLocalBooks, setRenderAsLocalBooks ] = useState(true);
  const [ unsyncedBooks, setUnsyncedBooks ] = useState<LocalBook[]>([]);
  const [ isDisplayingUnsynced, setIsDisplayingUnsynced ] = useState(false);

  useEffect(() => {
    setIsDisplayingUnsynced(false);
    setUnsyncedBooks([]);
    setTabList(TAB_LIST.filter(tab => !(!isLoggedIn && tab == TAB.WANT_TO_READ) && !(tab == TAB.UNSYNCED)));
    Local.getLocalGenres()
        .then((response: any) => {
          setAllGenres(response.genres);
        })
        .catch(err => {
          console.log(err);
        })
    Local.getLocalAuthors()
        .then((response: any) => {
          setAllAuthors(response.authors);
        })
        .catch(err => {
          console.log(err);
        })
    Local.getUnsyncedBooks()
        .then((response: any) => {
          setUnsyncedBooks(response.books);
        })
        .catch(err => {
          console.log(err);
        })
  }, []);

  useEffect(() => {
    setTabList(TAB_LIST.filter(tab => {
      if (!isLoggedIn && tab == TAB.WANT_TO_READ) {
        return false;
      }
      if (unsyncedBooks.length == 0 && tab == TAB.UNSYNCED) {
        return false;
      }
      return true;
    }));
  }, [unsyncedBooks])

  useEffect(() => {
    setTabList(TAB_LIST.filter(tab => !((!isLoggedIn || !currentUser.wishlist) && tab == TAB.WANT_TO_READ)));
  }, [currentUser])

  useEffect(() => {
    setBooks([]);
    if (chosenTab == TAB.RECENTLY_READ) {
      setRenderAsLocalBooks(true);
      setIsDisplayingUnsynced(false);
      Local.getRecentlyReadBooks()
          .then((response: any) => {
            setBooks([ ...response.books ]);
            console.log(response);
          })
          .catch(err => {
            console.log(err)
          })
    }
    else if (chosenTab == TAB.RECENTLY_ADDED) {
      setRenderAsLocalBooks(true);
      setIsDisplayingUnsynced(false);
      Local.getRecentlyAddedBooks()
          .then((response: any) => {
            setBooks([ ...response.books ]);
          })
          .catch(err => {
            console.log(err)
          })
    }
    else if (chosenTab == TAB.LOVED) {
      setRenderAsLocalBooks(true);
      setIsDisplayingUnsynced(false);
      Local.getLovedBooks()
          .then((response: any) => {
            setBooks([ ...response.books ]);
          })
          .catch(err => {
            console.log(err)
          })
    }
    else if (chosenTab == TAB.WANT_TO_READ) {
      setRenderAsLocalBooks(false);
      setIsDisplayingUnsynced(false);
      if (isLoggedIn && currentUser.wishlist) {
        console.log(currentUser.wishlist);
        setBooks([ ...currentUser.wishlist ]);
      }
      else {
        setBooks([]);
      }
      console.log(currentUser);
      // Local.getWantToReadBooks()
      //     .then((response: any) => {
      //       setBooks([ ...response.books ])
      //     })
      //     .catch(err => {
      //       console.log(err)
      //     })
    }
    else if (chosenTab == TAB.UNSYNCED) {
      setRenderAsLocalBooks(true);
      setIsDisplayingUnsynced(true);
      Local.getUnsyncedBooks()
          .then((response: any) => {
            setBooks([ ...response.books ]);
            setUnsyncedBooks([ ...response.books ]);
          })
          .catch(err => {
            console.log(err);
            setUnsyncedBooks([]);
          })
    }
    else {
      setRenderAsLocalBooks(true);
      setIsDisplayingUnsynced(false);
      Local.getAllDownloadedBooks()
          .then((response: any) => {
            setBooks([ ...response.books ])
          })
          .catch(err => {
            console.log(err)
          })
    }
  }, [chosenTab])

  const onSelectedGenresChange = (genres: Genre[]) => {
    setGenresFilter([...genres]);
		// console.log(genresFilter);
  }

  const onSelectedAuthorsChange = (authors: Author[]) => {
    setAuthorsFilter([...authors]);
		// console.log(genresFilter);
	}

  const showLoveButton = () => {
    return chosenTab != TAB.WANT_TO_READ;
  }

  const renderFilterButton = () => {
    return (
      <div className={styles['menu-button-container']}>
        <IconButton
          className={ theme.name == 'light' ? classes.iconButtonLight : classes.iconButtonDark }
          onClick={() => setShowFilters(!showFilters)}
        >
          <FilterListIcon />
        </IconButton>
      </div>
    );
  }

	return (
		<LibraryPageTemplate
      topBarLeft={renderFilterButton()}
      backgroundColor={theme.backgroundColor}
    >
      <div className={styles['container']}>

          <div className={styles['tabs']}>
            {
              tabList.map((tab, index) => (
                <div
                  key={`tab-${index}`}
                  className={tab == chosenTab ? styles['tab-active'] : styles['tab-inactive']}
                  style={tab == chosenTab ? { backgroundColor: theme.primaryButtonColor } : undefined}
                  onClick={() => setChosenTab(tab)}
                >
                  {tab}
                </div>
              ))
            }
          </div>
          <div className={styles['contents']}>
            {/* FILTER SECTION (TODO) */}
            {
              showFilters &&
              <div className={styles['filter-section']}>
                  <FilterCard
                    criteriaName="Genres"
                    values={allGenres}
                    wrapperStyle={{ margin: "0 14px", width: "340px", backgroundColor: theme.cardBGColor, }}
                    headerStyle={{ color: theme.sectionHeaderColor, }}
                  >
                    <Chips
                      placeholder="Type a genre name"
                      value={genresFilter}
                      onChange={onSelectedGenresChange}
                      suggestions={allGenres}
                      renderChip={(genre: Genre) => (<CustomChip chipColor={theme.chipColor}>{genre.name}</CustomChip>)}
                      renderSuggestion={(genre: Genre, p: any) => (
                        <div className={styles['suggestion']} key={genre.id}>{genre.name}</div>
                      )}
                      suggestionsFilter={(opt: any, val: any) => (
                        opt.name.toLowerCase().indexOf(val.toLowerCase()) !== -1
                        && (!genresFilter ||
                          genresFilter?.findIndex(genre => genre.name == opt.name) === -1)
                      )}
                      getSuggestionValue={(genre: Genre) => genre.name}
                      fromSuggestionsOnly={true}
                      uniqueChips={true}
                    />
                  </FilterCard>
                  <FilterCard
                    criteriaName="Authors"
                    values={allAuthors}
                    wrapperStyle={{ margin: "14px 14px 0", width: "340px", backgroundColor: theme.cardBGColor, }}
                    headerStyle={{ color: theme.sectionHeaderColor, }}
                  >
                    <Chips
                      placeholder="Type an author name"
                      value={authorsFilter}
                      onChange={onSelectedAuthorsChange}
                      suggestions={allAuthors}
                      renderChip={(author: Author) => (<CustomChip chipColor={theme.chipColor}>{author.name}</CustomChip>)}
                      renderSuggestion={(author: Author, p: any) => (
                        <div className={styles['suggestion']} key={author.id}>{author.name}</div>
                      )}
                      suggestionsFilter={(opt: any, val: any) => (
                        opt.name.toLowerCase().indexOf(val.toLowerCase()) !== -1
                        && (!authorsFilter ||
                          authorsFilter?.findIndex(author => author.name == opt.name) === -1)
                      )}
                      getSuggestionValue={(author: Author) => author.name}
                      fromSuggestionsOnly={true}
                      uniqueChips={true}
                    />
                  </FilterCard>
                </div>
            }
            <div className={styles['main-section']}>
              {
                books.length > 0 &&
                <BookList
                  books={books}
                  isLocalBooks={renderAsLocalBooks}
                  isUnsyncedBooks={isDisplayingUnsynced}
                  wrapperStyle={{
                    justifyContent: 'flex-start',
                    borderRadius: "10px",
                    padding: "0px"
                  }}
                  bookContainerStyle={{ width: "165px", margin: "20px 10px", fontSize: "0.85rem" }}
                  bookProps={{
                    wrapperStyle: { borderRadius: "10px", padding: "14px", backgroundColor: theme.bookCardBGColor },
                    bookTitleStyle: { fontSize: "0.85rem", color: theme.bookTitleColor },
                    bookAuthorsStyle: { fontSize: "0.8rem", fontWeight: 500, color: theme.bookAuthorsColor },
                    bookCoverStyle: { borderRadius: "10px" }
                  }}
                  isVerticalBookCard
                  // useProgressForChildren={chosenTab == TAB.RECENTLY_READ}
                  hideSubInfo
                  progressPathColor={theme.progressPathColor}
                  progressTrailColor={theme.progressTrailColor}
                  progressTextColor={theme.progressTextColor}
                  starColor={theme.starColor}
                  showLoveButton={showLoveButton()}
                  // showSimpleRating
                />
              }

            {/* {
              chosenTab !== TAB.WANT_TO_READ &&
              <BookList
                books={books}
                isLocalBooks
                wrapperStyle={{
                  justifyContent: 'flex-start',
                  borderRadius: "10px",
                  padding: "0px"
                }}
                bookContainerStyle={{ width: "165px", margin: "20px 10px", fontSize: "0.85rem" }}
                bookProps={{
                  wrapperStyle: { borderRadius: "10px", padding: "14px", backgroundColor: theme.bookCardBGColor },
                  bookTitleStyle: { fontSize: "0.85rem", color: theme.bookTitleColor },
                  bookAuthorsStyle: { fontSize: "0.8rem", fontWeight: 500, color: theme.bookAuthorsColor },
                  bookCoverStyle: { borderRadius: "10px" }
                }}
                isVerticalBookCard
                useProgressForChildren={chosenTab == TAB.RECENTLY_READ}
                hideSubInfo
                progressPathColor={theme.progressPathColor}
                progressTrailColor={theme.progressTrailColor}
                progressTextColor={theme.progressTextColor}
                starColor={theme.starColor}
                showLoveButton={showLoveButton()}
                // showSimpleRating
              />
            }
            {
              chosenTab === TAB.WANT_TO_READ &&
              <BookList
                books={books}
                wrapperStyle={{
                  justifyContent: 'flex-start',
                  borderRadius: "10px",
                  padding: "0px"
                }}
                bookContainerStyle={{ width: "165px", margin: "20px 10px", fontSize: "0.85rem" }}
                bookProps={{
                  wrapperStyle: { borderRadius: "10px", padding: "14px", backgroundColor: theme.bookCardBGColor },
                  bookTitleStyle: { fontSize: "0.85rem", color: theme.bookTitleColor },
                  bookAuthorsStyle: { fontSize: "0.8rem", fontWeight: 500, color: theme.bookAuthorsColor },
                  bookCoverStyle: { borderRadius: "10px" }
                }}
                isVerticalBookCard
                useProgressForChildren={chosenTab == TAB.RECENTLY_READ}
                hideSubInfo
                progressPathColor={theme.progressPathColor}
                progressTrailColor={theme.progressTrailColor}
                progressTextColor={theme.progressTextColor}
                starColor={theme.starColor}
                showLoveButton={showLoveButton()}
                // showSimpleRating
              />

            } */}
            </div>
          </div>
      </div>
    </LibraryPageTemplate>
	);
}

const mapStateToProps = (state) => ({
  local: state.local,
  user: state.users
});

export default connect(mapStateToProps)(LocalLibrary);
