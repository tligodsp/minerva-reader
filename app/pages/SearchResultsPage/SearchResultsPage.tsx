import React from 'react';

import { FilterCard } from '../../components/common/molecules';
import { BookList, BookListSection } from '../../components/common/organisms';
import { LibraryPageTemplate } from '../../components/common/template';
import { Colors } from '../../styles';
import { mockBooks } from '../../utils/mock-books';
import { mockGenres } from '../../utils/mock-genres';
import { mockAuthors } from '../../utils/mock-authors';
import styles from './SearchResultsPage.css';

const SearchResultsPage = () => {
  const _mockBooks = mockBooks.slice(0, 12);

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
          />
          <FilterCard
            criteriaName="Authors"
            values={mockAuthors}
            wrapperStyle={{ margin: "14px 14px 0" }}
          />
        </div>
        {/* SEARCH RESULTS SECTION */}
        <BookListSection
          sectionTitle="Search Result Books"
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
            books={_mockBooks}
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
