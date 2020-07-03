import React, { useState, useEffect } from 'react';

import { FilterCard } from '../../components/common/molecules';
import { BookList, BookListSection } from '../../components/common/organisms';
import { LibraryPageTemplate } from '../../components/common/template';
import { Colors } from '../../styles';
import { Genre, Author } from '../../types';
import { mockBooks } from '../../utils/mock-books';
import { mockGenres } from '../../utils/mock-genres';
import { mockAuthors } from '../../utils/mock-authors';
import Chips, { Chip } from 'react-chips'
import { useLocation } from 'react-router-dom';
import * as Service from '../../utils/serviceUtils';
import styles from './SearchResultsPage.css';

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

const SearchResultsPage = () => {
  const location: any = useLocation();
  // const { searchTerm, passedAuthorsFilter, passedGenresFilter } = location.state as any;
  const passedSearchTerm = location.state && location.state.passedSearchTerm ? location.state.passedSearchTerm : '';
  const passedAuthorIds = location.state && location.state.passedAuthorIds ? location.state.passedAuthorIds : [];
  const passedGenreIds = location.state && location.state.passedGenreIds ? location.state.passedGenreIds: [];
  const [ allGenres, setAllGenres ] = useState([]);
  const [ allAuthors, setAllAuthors ] = useState([]);
  const [ filteredBooks, setFilteredBooks ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ genresFilter, setGenresFilter ] = useState<Genre[]>([]);
  const [ authorsFilter, setAuthorsFilter ] = useState<Author[]>([]);


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

  useEffect(() => {
    updateFilteredBooks();
  }, [genresFilter, authorsFilter, searchTerm])

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

  const updateFilteredBooks = () => {
    const genreIds = genresFilter ? genresFilter.map(genre => genre.id) : [];
    const authorIds = authorsFilter ? authorsFilter.map(author => author.id) : [];
    Service.getBookByFilters(searchTerm, authorIds, genreIds)
      .then((response: any) => {
        setFilteredBooks(response.books);
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

  return (
    <LibraryPageTemplate>
      <div className={styles['page-content']}>
        {/* FILTER SECTION */}
        <div className={styles['filter-section']}>
          <div
            className={styles['header-container']}
            style={{
              fontFamily: "Quicksand, sans-serif",
              fontSize: "1.15rem",
              fontWeight: "bold",
              padding: "15px 20px"
            }}
          >
            <div>Filters</div>
          </div>
          <FilterCard
            criteriaName="Genres"
            values={mockGenres}
            wrapperStyle={{ margin: "0 14px" }}
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
            values={mockAuthors}
            wrapperStyle={{ margin: "14px 14px 0" }}
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
        {/* SEARCH RESULTS SECTION */}
        <BookListSection
          sectionTitle={`Search Results for "${searchTerm}"`}
          wrapperStyle={{ flex: 1, margin: "0 14px" }}
          headerContainerStyle={{
            fontFamily: "Quicksand, sans-serif",
            fontSize: "1.15rem",
            fontWeight: "bold",
            padding: "15px 20px"
          }}
          showButton={false}
        >
          <BookList
            books={filteredBooks}
            wrapperStyle={{
              justifyContent: 'flex-start',
              backgroundColor: Colors.WHITE,
              borderRadius: "20px",
              padding: "10px"
            }}
            bookContainerStyle={{ width: "31%", margin: "1%", fontSize: "0.85rem" }}
            bookProps={{ bookTitleStyle: { fontSize: "1rem" } }}
          />
        </BookListSection>
      </div>
    </LibraryPageTemplate>
  );
}

export default SearchResultsPage;
