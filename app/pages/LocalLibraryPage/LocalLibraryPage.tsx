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

const TAB = {
	RECENTLY_READ: 'Recently Read',
	RECENTLY_ADDED: 'Recently Added',
	WANT_TO_READ: 'Want To Read',
	ALL: 'All Downloaded',
}

const TAB_LIST = [
	TAB.RECENTLY_READ,
	TAB.RECENTLY_ADDED,
	TAB.WANT_TO_READ,
	TAB.ALL
];

const useStyles = makeStyles(() =>
  createStyles({
    iconButton: {
      fontSize: "2rem"
    },
  }),
);

const CustomChip = (props: any) => {
	return (
		<div className={styles['custom-chip-container']}>
			{props.children}
			<div
				className={styles['chip-x-icon']}
				onClick={() => props.onRemove(props.index)}
			>&times;</div>
		</div>
	);
}

const LocalLibrary = () => {
  const [chosenTab, setChosenTab] = useState(TAB.RECENTLY_READ);
  const [books, setBooks] = useState<LocalBook[]>([]);
  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const [allAuthors, setAllAuthors] = useState<Author[]>([]);
  const [ genresFilter, setGenresFilter ] = useState<Genre[]>([]);
  const [ authorsFilter, setAuthorsFilter ] = useState<Author[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const classes = useStyles();

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (chosenTab == TAB.RECENTLY_READ) {
      Local.getRecentlyReadBooks()
          .then((response: any) => {
            setBooks(response.books)
            console.log(response);
          })
          .catch(err => {
            console.log(err)
          })
    }
    else if (chosenTab == TAB.RECENTLY_ADDED) {
      Local.getRecentlyAddedBooks()
          .then((response: any) => {
            setBooks(response.books)
          })
          .catch(err => {
            console.log(err)
          })
    }
    else if (chosenTab == TAB.WANT_TO_READ) {
      Local.getWantToReadBooks()
          .then((response: any) => {
            setBooks(response.books)
          })
          .catch(err => {
            console.log(err)
          })
    }
    else {
      Local.getAllDownloadedBooks()
          .then((response: any) => {
            setBooks(response.books)
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

  const renderFilterButton = () => {
    return (
      <div className={styles['menu-button-container']}>
        <IconButton className={classes.iconButton} onClick={() => setShowFilters(!showFilters)}>
          <FilterListIcon />
        </IconButton>
      </div>
    );
  }

	return (
		<LibraryPageTemplate
      topBarLeft={renderFilterButton()}
    >
      <div className={styles['container']}>

          <div className={styles['tabs']}>
            {
              TAB_LIST.map((tab, index) => (
                <div
                  key={`tab-${index}`}
                  className={tab == chosenTab ? styles['tab-active'] : styles['tab-inactive']}
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
                    wrapperStyle={{ margin: "0 14px", width: "340px" }}
                  >
                    <Chips
                      placeholder="Type a genre name"
                      value={genresFilter}
                      onChange={onSelectedGenresChange}
                      suggestions={allGenres}
                      renderChip={(genre: Genre) => (<CustomChip>{genre.name}</CustomChip>)}
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
                    wrapperStyle={{ margin: "14px 14px 0", width: "340px" }}
                  >
                    <Chips
                      placeholder="Type an author name"
                      value={authorsFilter}
                      onChange={onSelectedAuthorsChange}
                      suggestions={allAuthors}
                      renderChip={(author: Author) => (<CustomChip>{author.name}</CustomChip>)}
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
                wrapperStyle: { borderRadius: "10px", padding: "14px" },
                bookTitleStyle: { fontSize: "0.85rem" },
                bookAuthorsStyle: { fontSize: "0.8rem" },
                bookCoverStyle: { borderRadius: "10px" }
              }}
              isVerticalBookCard
              useProgressForChildren={chosenTab == TAB.RECENTLY_READ}
              hideSubInfo
              showSimpleRating
            />
            </div>
          </div>
      </div>
    </LibraryPageTemplate>
	);
}

export default LocalLibrary;
