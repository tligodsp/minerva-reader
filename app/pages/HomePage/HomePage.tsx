import React, { useEffect } from 'react';
import Carousel from 'nuka-carousel';

import { connect } from 'react-redux';

import { fetchBooks } from '../../actions/bookActions';
import { RatingBar } from '../../components/common/atoms';
import { BookInfoCard } from '../../components/common/molecules';
import { BookList, BookListSection } from '../../components/common/organisms';
import { LibraryPageTemplate } from '../../components/common/template';
import { Colors } from '../../styles';
import { Book } from '../../types';

const HomePage = (props) => {
  const _allBooks = props.books.allBooks.slice(0, 12);

  useEffect(() => {
    props.fetchBooks();
    console.log(props);
  }, []);

  return (
    <LibraryPageTemplate>
      <BookListSection
        sectionTitle="You Might Like"
        buttonLabel="View All"
        wrapperStyle={{ padding: "0 40px", minWidth: "0" }}
        headerContainerStyle={{
          fontFamily: "Quicksand, sans-serif",
          fontSize: "1.15rem",
          fontWeight: "bold",
          padding: "15px 20px"
        }}
        buttonColor="linear-gradient(270deg, #7670FF 49.62%, #8B82FF 100%)"
      >
        <Carousel
          slidesToShow={3}
          slidesToScroll={3}
          cellSpacing={30}
          framePadding="0 30px"
          slideWidth="436px"
          defaultControlsConfig={{
            nextButtonText: '›',
            prevButtonText: '‹',
            nextButtonStyle: {
              width: "34px",
              height: "34px",
              lineHeight: "0",
              borderRadius: "100%",
              transform: "translateX(16px)"
            },
            prevButtonStyle: {
              width: "34px",
              height: "34px",
              lineHeight: "0",
              borderRadius: "100%",
              transform: "translateX(-16px)"
            },
            pagingDotsStyle: { display: "none" }
          }}
        >
          {
            _allBooks.map((book: Book, index: number) => (
              <div key={`book${index}`}>
                <BookInfoCard
                  id={book.id}
                  title={book.title}
                  cover={book.cover}
                  authors={book.authors ? `by ${book.authors[0].name}` : ""}
                  smartBackgroundColor={true}
                  bookTitleStyle={{
                    color: Colors.WHITE,
                    textShadow: "0px 0px 10px #000000",
                    fontSize: "1.25rem"
                  }}
                  bookAuthorsStyle={{
                    color: Colors.WHITE,
                    textShadow: "0px 0px 10px #000000",
                    fontSize: "1rem"
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: "flex-end",
                      paddingRight: "30%"
                    }}
                  >
                    <RatingBar
                      ratingValue={book.ratingValue ? book.ratingValue / 5 : 0}
                      starStyle={{ color: Colors.WHITE }}
                    />
                  </div>
                </BookInfoCard>
              </div>
            ))
          }
        </Carousel>
      </BookListSection>

      {/* POPULAR SECTION */}
      <BookListSection
        sectionTitle="Popular Books"
        buttonLabel="View All"
        wrapperStyle={{ padding: "0 40px" }}
        headerContainerStyle={{
          fontFamily: "Quicksand, sans-serif",
          fontSize: "1.15rem",
          fontWeight: "bold",
          padding: "15px 20px"
        }}
        buttonColor="linear-gradient(270deg, #7670FF 49.62%, #8B82FF 100%)"
      >
        <BookList
          books={_allBooks}
          wrapperStyle={{
            justifyContent: 'flex-start',
            backgroundColor: Colors.WHITE,
            borderRadius: "20px",
            padding: "10px"
          }}
          bookContainerStyle={{ width: "23%", margin: "1%", fontSize: "0.85rem" }}
          bookProps={{ bookTitleStyle: { fontSize: "1rem" } }}
        />
      </BookListSection>
    </LibraryPageTemplate>
  );
}

const mapStateToProps = (state) => ({
  books: state.books
})

export default connect(mapStateToProps, { fetchBooks })(HomePage);
