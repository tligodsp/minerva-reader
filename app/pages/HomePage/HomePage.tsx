import React, { useEffect, useState } from 'react';
import Carousel from 'nuka-carousel';

import { connect } from 'react-redux';

import { fetchBooks } from '../../actions/bookActions';
import { RatingBar } from '../../components/common/atoms';
import { BookInfoCard, LoadingOverlay } from '../../components/common/molecules';
import { BookList, BookListSection } from '../../components/common/organisms';
import { LibraryPageTemplate } from '../../components/common/template';
import { Colors } from '../../styles';
import { Book } from '../../types';
import * as Service from '../../utils/serviceUtils';

const HomePage = (props) => {
  const _allBooks = props.books.allBooks.slice(0, 12);
  const [ recommendBooks, setRecommendBooks ] = useState<Book[]>([]);
  const [ isRecommendSectionLoading, setIsRecommendSectionLoading ] = useState(false);
  const [ popularBooks, setPopularBooks ] = useState<Book[]>([]);
  const [ isPopularSectionLoading, setIsPopularSectionLoading ] = useState(false);
  const [ highRatedBooks, setHighRatedBooks ] = useState<Book[]>([]);
  const [ isHighRatedSectionLoading, setIsHighRatedSectionLoading ] = useState(false);
  const [ newBooks, setNewBooks ] = useState<Book[]>([]);
  const [ isNewSectionLoading, setIsNewSectionLoading ] = useState(false);
  const { theme } = props.local;
  const { currentUser, isLoggedIn } = props.user;

  useEffect(() => {
    // props.fetchBooks();
    // console.log(props);
    setIsRecommendSectionLoading(true);
    setIsPopularSectionLoading(true);
    setIsHighRatedSectionLoading(true);
    setIsNewSectionLoading(true);
    if (currentUser && currentUser.favoriteGenreIds) {
      Service.getRecommendBooks(currentUser.favoriteGenreIds)
        .then((response: any) => {
          console.log(response);
          setRecommendBooks(response.books);
          setIsRecommendSectionLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsRecommendSectionLoading(false);
        });
    }
    Service.getPopularBooks(8)
      .then((response: any) => {
        setPopularBooks(response.books);
        setIsPopularSectionLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsPopularSectionLoading(false);
      });
    Service.getHighRatedBooks(8)
      .then((response: any) => {
        setHighRatedBooks(response.books);
        setIsHighRatedSectionLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsHighRatedSectionLoading(false);
      });
    Service.getNewBooks(8)
      .then((response: any) => {
        setNewBooks(response.books);
        setIsNewSectionLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsNewSectionLoading(false);
      });
  }, []);

  const showRecommend = () => {
      if (!isLoggedIn || !currentUser || !currentUser.favoriteGenreIds || currentUser.favoriteGenreIds.length == 0) {
          return false;
      }
      return true;
  }

  return (
    <LibraryPageTemplate backgroundColor={theme.backgroundColor}>
        {
            showRecommend() &&
            <BookListSection
                sectionTitle="You Might Like"
                buttonLabel="View All"
                wrapperStyle={{ padding: "0 40px", minWidth: "0" }}
                headerContainerStyle={{
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.15rem",
                fontWeight: "bold",
                padding: "15px 20px",
                color: theme.sectionHeaderColor,
                }}
                // buttonColor="linear-gradient(270deg, #7670FF 49.62%, #8B82FF 100%)"
            >
                {
                isRecommendSectionLoading &&
                <div style={{ position: 'relative', height: '200px' }}>
                    <LoadingOverlay show={isRecommendSectionLoading} noOverlay={true}/>
                </div>
                }
                {
                !isRecommendSectionLoading &&
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
                    recommendBooks.map((book: Book, index: number) => (
                        <div key={`book${index}`}>
                        <BookInfoCard
                            id={book.id}
                            title={book.title}
                            cover={book.cover}
                            authors={book.authors ? `by ${book.authors[0].name}` : ""}
                            smartBackgroundColor={theme.name == 'light'}
                            wrapperStyle={
                            theme.name == 'light' ? undefined : { backgroundColor: theme.bookCardBGColor }
                            }
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
                }
            </BookListSection>
        }

      {/* POPULAR SECTION */}
      <BookListSection
        sectionTitle="Popular Books"
        buttonLabel="View All"
        wrapperStyle={{ padding: "0 40px", marginTop: '45px' }}
        headerContainerStyle={{
          fontFamily: "Quicksand, sans-serif",
          fontSize: "1.15rem",
          fontWeight: "bold",
          padding: "0 20px",
          color: theme.sectionHeaderColor,
        }}
        // buttonColor="linear-gradient(270deg, #7670FF 49.62%, #8B82FF 100%)"
      >
        {
          isPopularSectionLoading &&
          <div style={{ position: 'relative', height: '200px' }}>
            <LoadingOverlay show={isPopularSectionLoading} noOverlay={true}/>
          </div>
        }
        {
          !isPopularSectionLoading &&
          <BookList
            books={popularBooks}
            wrapperStyle={{
              justifyContent: 'flex-start',
              backgroundColor: theme.backgroundColor ,
              borderRadius: "20px",
              padding: "10px"
            }}
            bookContainerStyle={{
              width: "23%",
              margin: "1%",
              fontSize: "0.85rem",
            }}
            bookProps={{
              bookTitleStyle: { fontSize: "1rem", color: theme.bookTitleColor },
              bookAuthorsStyle: { fontWeight: 500, color: theme.bookAuthorsColor },
              wrapperStyle: { backgroundColor: theme.bookCardBGColor },
            }}
            starColor={theme.starColor}
            showBookRatingCount
          />
        }
      </BookListSection>

      {/* HIGH RATED SECTION */}
      <BookListSection
        sectionTitle="High Rated Books"
        buttonLabel="View All"
        wrapperStyle={{ padding: "0 40px", marginTop: '45px' }}
        headerContainerStyle={{
          fontFamily: "Quicksand, sans-serif",
          fontSize: "1.15rem",
          fontWeight: "bold",
          padding: "0 20px",
          color: theme.sectionHeaderColor,
        }}
        // showButton
        // buttonColor="linear-gradient(270deg, #7670FF 49.62%, #8B82FF 100%)"
      >
        {
          isHighRatedSectionLoading &&
          <div style={{ position: 'relative', height: '200px' }}>
            <LoadingOverlay show={isPopularSectionLoading} noOverlay={true}/>
          </div>
        }
        {
          !isHighRatedSectionLoading &&
          <BookList
            books={highRatedBooks}
            wrapperStyle={{
              justifyContent: 'flex-start',
              backgroundColor: theme.backgroundColor ,
              borderRadius: "20px",
              padding: "10px"
            }}
            bookContainerStyle={{
              width: "23%",
              margin: "1%",
              fontSize: "0.85rem",
            }}
            bookProps={{
              bookTitleStyle: { fontSize: "1rem", color: theme.bookTitleColor },
              bookAuthorsStyle: { fontWeight: 500, color: theme.bookAuthorsColor },
              wrapperStyle: { backgroundColor: theme.bookCardBGColor },
            }}
            starColor={theme.starColor}
            showBookRatingCount
          />
        }
      </BookListSection>

      {/* NEWLY ADDED SECTION */}
      <BookListSection
        sectionTitle="Newly Added Books"
        buttonLabel="View All"
        wrapperStyle={{ padding: "0 40px", marginTop: '45px' }}
        headerContainerStyle={{
          fontFamily: "Quicksand, sans-serif",
          fontSize: "1.15rem",
          fontWeight: "bold",
          padding: "0 20px",
          color: theme.sectionHeaderColor,
        }}
        // buttonColor="linear-gradient(270deg, #7670FF 49.62%, #8B82FF 100%)"
      >
        {
          isNewSectionLoading &&
          <div style={{ position: 'relative', height: '200px' }}>
            <LoadingOverlay show={isPopularSectionLoading} noOverlay={true}/>
          </div>
        }
        {
          !isNewSectionLoading &&
          <BookList
            books={newBooks}
            wrapperStyle={{
              justifyContent: 'flex-start',
              backgroundColor: theme.backgroundColor ,
              borderRadius: "20px",
              padding: "10px"
            }}
            bookContainerStyle={{
              width: "23%",
              margin: "1%",
              fontSize: "0.85rem",
            }}
            bookProps={{
              bookTitleStyle: { fontSize: "1rem", color: theme.bookTitleColor },
              bookAuthorsStyle: { fontWeight: 500, color: theme.bookAuthorsColor },
              wrapperStyle: { backgroundColor: theme.bookCardBGColor },
            }}
            starColor={theme.starColor}
            showBookRatingCount
          />
        }
      </BookListSection>
    </LibraryPageTemplate>
  );
}

const mapStateToProps = (state) => ({
  books: state.books,
  local: state.local,
  user: state.users,
})

export default connect(mapStateToProps, { fetchBooks })(HomePage);
