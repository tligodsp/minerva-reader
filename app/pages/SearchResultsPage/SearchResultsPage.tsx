import React, { useState, useEffect } from 'react';

import { FilterCard, LoadingOverlay, NotFoundDisplay } from '../../components/common/molecules';
import { BookList, BookListSection } from '../../components/common/organisms';
import { LibraryPageTemplate } from '../../components/common/template';
import { Colors } from '../../styles';
import { Genre, Author, Book } from '../../types';
import { mockBooks } from '../../utils/mock-books';
// import { mockGenres } from '../../utils/mock-genres';
// import { mockAuthors } from '../../utils/mock-authors';
import Chips, { Chip } from 'react-chips'
import { useLocation, useHistory } from 'react-router-dom';
import * as Service from '../../utils/serviceUtils';
import styles from './SearchResultsPage.css';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import * as Constants from '../../utils/constants';

const useStyles = makeStyles(() =>
  createStyles({
    iconButton: {
      fontSize: "2rem"
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

const SearchResultsPage = (props) => {
  const location: any = useLocation();
  // const { searchTerm, passedAuthorsFilter, passedGenresFilter } = location.state as any;
  const passedSearchTerm = location.state && location.state.passedSearchTerm ? location.state.passedSearchTerm : '';
  const passedAuthorIds = location.state && location.state.passedAuthorIds ? location.state.passedAuthorIds : [];
  const passedGenreIds = location.state && location.state.passedGenreIds ? location.state.passedGenreIds: [];
  const [ allGenres, setAllGenres ] = useState([]);
  const [ allAuthors, setAllAuthors ] = useState([]);
  const [ foundBooks, setFoundBooks ] = useState([]);
  const [ filteredBooks, setFilteredBooks ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ genresFilter, setGenresFilter ] = useState<Genre[]>([]);
  const [ authorsFilter, setAuthorsFilter ] = useState<Author[]>([]);
  const [ isSearching, setIsSearching ] = useState(false);
  const classes = useStyles();
  const { theme } = props.local;
  let history = useHistory();

  useEffect(() => {
    setFilterValues();
    // Service.getBookByFilters(passedSearchTerm, passedAuthorIds, passedGenreIds)
    //   .then((response: any) => {
    //     setFilteredBooks(response.books);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
    Service.getGenres()
      .then((response: any) => {
        setAllGenres(response.genres);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    Service.getAuthors()
      .then((response: any) => {
        setAllAuthors(response.authors);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  // useEffect(() => {
  //   updateFilteredBooks();
  // }, [genresFilter, authorsFilter, searchTerm])

  useEffect(() => {
    searchBooks();
  }, [searchTerm])

  useEffect(() => {
    applyFilters();
  }, [genresFilter, authorsFilter, foundBooks])

  useEffect(() => {
    setFilterValues();
  }, [location.state])

  const setFilterValues = () => {
    if (location.state && location.state.passedAuthors) {
      setAuthorsFilter([ ...location.state.passedAuthors ]);
    }
    if (location.state && location.state.passedGenres) {
      setGenresFilter([ ...location.state.passedGenres ]);
    }
    if (location.state && location.state.passedSearchTerm) {
      setSearchTerm(location.state.passedSearchTerm);
    }
    else {
      setSearchTerm('');
    }
  }

  const applyFilters = () => {
    const genreIds = genresFilter ? genresFilter.map(genre => genre.id) : [];
    const authorIds = authorsFilter ? authorsFilter.map(author => author.id) : [];
    let res = [ ...foundBooks ];
    for (let authorId of authorIds) {
      res = [ ...res.filter((book: Book) => Service.isElemInList(authorId, book.authorIds)) ];
    }
    for (let genreId of genreIds) {
      res = [ ...res.filter((book: Book) => Service.isElemInList(genreId, book.genreIds)) ];
    }
    setFilteredBooks([ ...res ]);
  }

  const searchBooks = () => {
    setIsSearching(true);
    setFilteredBooks([]);
    Service.getBookByFilters(searchTerm)
      .then((response: any) => {
        setIsSearching(false);
        setFoundBooks(response.books);
      })
      .catch(error => {
        console.log(error);
      })
  }

  // const _mockBooks = mockBooks.slice(0, 12);
  const onSelectedGenresChange = (genres: Genre[]) => {
    setGenresFilter([...genres]);
		// console.log(genresFilter);
  }

  const onSelectedAuthorsChange = (authors: Author[]) => {
    setAuthorsFilter([...authors]);
		// console.log(genresFilter);
  }

  const renderHomeButton = () => {
    return (
      <div style={{
        position: 'absolute',
        left: '20px',
      }}>
        <IconButton className={classes.iconButton} onClick={handleHomeClick}>
          <HomeIcon />
        </IconButton>
      </div>
    );
  }

  const handleHomeClick = () => {
    history.push(`/home`);
  }

  return (
    <LibraryPageTemplate
      backgroundColor={theme.backgroundColor}
      topBarLeft={renderHomeButton()}
    >
      <div className={styles['page-content']}>
        {/* FILTER SECTION */}
        <div className={styles['filter-section']}>
          <div
            className={styles['header-container']}
            style={{
              fontFamily: "Quicksand, sans-serif",
              fontSize: "1.15rem",
              fontWeight: "bold",
              padding: "15px 20px",
              color: theme.sectionHeaderColor,
            }}
          >
            <div>Filters</div>
          </div>
          <FilterCard
            criteriaName="Genres"
            values={allGenres}
            wrapperStyle={{ margin: "20px 14px 0", backgroundColor: theme.cardBGColor, }}
            headerStyle={{ color: theme.sectionHeaderColor, }}
          >
            <Chips
              placeholder="Type a genre name"
              value={genresFilter}
              onChange={onSelectedGenresChange}
              suggestions={allGenres}
              renderChip={(genre: Genre) => (
                <CustomChip chipColor={theme.chipColor}>{genre.name}</CustomChip>
              )}
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
            wrapperStyle={{ margin: "14px 14px 0", backgroundColor: theme.cardBGColor, }}
            headerStyle={{ color: theme.sectionHeaderColor, }}
          >
            <Chips
              placeholder="Type an author name"
              value={authorsFilter}
              onChange={onSelectedAuthorsChange}
              suggestions={allAuthors}
              renderChip={(author: Author) => (
                <CustomChip chipColor={theme.chipColor}>{author.name}</CustomChip>
              )}
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
        {/* SEARCH RESULTS SECTION */}
        <BookListSection
          sectionTitle={`Search Results for "${searchTerm}"`}
          wrapperStyle={{ flex: 1, margin: "0 14px" }}
          headerContainerStyle={{
            fontFamily: "Quicksand, sans-serif",
            fontSize: "1.15rem",
            fontWeight: "bold",
            padding: "15px 20px",
            color: theme.sectionHeaderColor,
          }}
        >
          {
            isSearching &&
            <div style={{ flex: 1, position: 'relative' }}>
              <LoadingOverlay show={isSearching} noOverlay/>
            </div>
          }
          {
            !isSearching &&
            <BookList
              books={filteredBooks}
              wrapperStyle={{
                justifyContent: 'flex-start',
                // backgroundColor: Colors.WHITE,
                backgroundColor: theme.backgroundColor ,
                borderRadius: "10px",
                padding: "0"
              }}
              // bookContainerStyle={{ width: "31%", margin: "1%", fontSize: "0.85rem" }}
              bookContainerStyle={{ width: "165px", margin: "20px 10px", fontSize: "0.85rem" }}
              // bookProps={{ bookTitleStyle: { fontSize: "1rem" } }}
              bookProps={{
                wrapperStyle: { borderRadius: "10px", padding: "14px", backgroundColor: theme.bookCardBGColor },
                bookTitleStyle: { fontSize: "0.85rem", color: theme.bookTitleColor },
                bookAuthorsStyle: { fontSize: "0.8rem", fontWeight: 500, color: theme.bookAuthorsColor },
                bookCoverStyle: { borderRadius: "10px" }
              }}
              starColor={theme.starColor}
              isVerticalBookCard
            />
          }
          {
            (!isSearching && filteredBooks.length == 0) &&
            <NotFoundDisplay theme={theme}/>
          }
        </BookListSection>
      </div>
    </LibraryPageTemplate>
  );
}

const mapStateToProps = (state) => ({
  local: state.local,
});

export default connect(mapStateToProps)(SearchResultsPage);
