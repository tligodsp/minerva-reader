import React, { ReactNode } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import defaultStyles from './BookList.css';
import { BookInfoCard } from '../../molecules';
import { RatingBar } from '../../atoms';
import { Book, LocalBook, Author, Genre } from '../../../../types';

interface BookInfoCardStyleProps {
  wrapperStyle?: React.CSSProperties;
  bookCoverStyle?: React.CSSProperties;
  bookInfoContainerStyle?: React.CSSProperties;
  bookTitleStyle?: React.CSSProperties;
  bookAuthorsStyle?: React.CSSProperties;
  bookSubInfoStyle?: React.CSSProperties;
}

interface BookListProps {
  books: Book[] | LocalBook[];
  isLocalBooks?: boolean;
  bookTitleFontSize?: string;
  bookDefaultFontSize?: string;
  wrapperStyle?: React.CSSProperties;
  bookContainerStyle?: React.CSSProperties;
  bookProps?: BookInfoCardStyleProps;
  useProgressForSubInfo?: boolean;
  useProgressForChildren?: boolean;
  isVerticalBookCard?: boolean;
  hideSubInfo?: boolean;
  showSimpleRating?: boolean;
  // TODO: Add book card display type: Rating|Progress
}

const BookList = ({
    books, isLocalBooks, bookTitleFontSize, bookDefaultFontSize,
    wrapperStyle, bookContainerStyle, bookProps, useProgressForSubInfo,
    useProgressForChildren, isVerticalBookCard, hideSubInfo, showSimpleRating }
  : BookListProps) => {
  const _books: any = books ? books : [];
  const _getAuthorsString = (authors: Author[]) => {
    let res: string = authors?.reduce((accumulator, currentAuthor: Author) => (accumulator + currentAuthor.name + ", "), "");
    res = res.match(/^(.+),\s$/)![1];
    return res;
  }

  const _getGenresString = (genres: Genre[]) => {
    let res: string = genres?.reduce((accumulator, currentGenre: Genre) => (accumulator + currentGenre.name + ", "), "");
    res = res.match(/^(.+),\s$/)![1];
    return res;
  }

  const _getSubInfo = (book) => {
    if (hideSubInfo == null || hideSubInfo == true) {
      return undefined;
    }
    if (useProgressForSubInfo) {
      // TODO: Get Progress by book and user
      return 'Chapter 1';
    }
    return book.genres ? _getGenresString(book.genres) : "";
  }

  const renderBookList = () => {
    return (
      <div
        className={ defaultStyles["wrapper"] }
        style={{ ...wrapperStyle }}
      >
        {
          _books.map((book: Book, index: number) => {
            return(
              <div
                key={`book-${index}`}
                className={ defaultStyles["book-container"] }
                style={{ ...bookContainerStyle }}
              >
                <BookInfoCard
                  id={book.id}
                  title={book.title}
                  authors={book.authors ? _getAuthorsString(book.authors) : ""}
                  subInfo={_getSubInfo(book)}
                  cover={book.cover}
                  wrapperStyle={{ ...bookProps?.wrapperStyle }}
                  bookCoverStyle={{ ...bookProps?.bookCoverStyle }}
                  bookInfoContainerStyle={{
                    fontSize: bookDefaultFontSize ? bookDefaultFontSize : "0.9rem" ,
                    ...bookProps?.bookInfoContainerStyle
                  }}
                  bookAuthorsStyle={{ ...bookProps?.bookAuthorsStyle }}
                  bookSubInfoStyle={{ ...bookProps?.bookSubInfoStyle }}
                  bookTitleStyle={{
                    fontSize: bookTitleFontSize ? bookTitleFontSize : "1.1rem",
                    color: "#7670FF",
                    ...bookProps?.bookTitleStyle
                  }}
                  isVertical={isVerticalBookCard}
                >
                  {
                    useProgressForChildren ?
                    (
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                        <div style={{ width: "25px", marginTop: "5px"}}>
                          <CircularProgressbar
                            value={66}
                            styles={{
                              path: {
                                stroke: "#7670FF"
                              },
                            }}
                          />
                        </div>
                        <div style={{ marginLeft: "5px", fontWeight: "bold", color: "#7670FF" }}>66%</div>
                      </div>
                    )
                    : (<div
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: "flex-end",
                        paddingRight: "16%"
                      }}
                    >
                      <RatingBar ratingValue={book.ratingValue ? book.ratingValue / 5 : 0}/>
                      <div style={{ fontWeight: "bold", marginLeft: "10px" }}>({book.ratingCount})</div>
                    </div>)
                  }
                </BookInfoCard>
              </div>
          )})
        }
      </div>
    );
  }

  const renderLocalBookList = () => {
    return (
      <div
        className={ defaultStyles["wrapper"] }
        style={{ ...wrapperStyle }}
      >
        {
          _books.map(({ book, readingProgress }: LocalBook, index: number) => {
            console.log(book);
            return(
              <div
                key={`book-${index}`}
                className={ defaultStyles["book-container"] }
                style={{ ...bookContainerStyle }}
              >
                <BookInfoCard
                  id={book.id}
                  title={book.title}
                  authors={book.authors ? _getAuthorsString(book.authors) : ""}
                  subInfo={_getSubInfo(book)}
                  cover={book.cover}
                  wrapperStyle={{ ...bookProps?.wrapperStyle }}
                  bookCoverStyle={{ ...bookProps?.bookCoverStyle }}
                  bookInfoContainerStyle={{
                    fontSize: bookDefaultFontSize ? bookDefaultFontSize : "0.9rem" ,
                    ...bookProps?.bookInfoContainerStyle
                  }}
                  bookAuthorsStyle={{ ...bookProps?.bookAuthorsStyle }}
                  bookSubInfoStyle={{ ...bookProps?.bookSubInfoStyle }}
                  bookTitleStyle={{
                    fontSize: bookTitleFontSize ? bookTitleFontSize : "1.1rem",
                    color: "#7670FF",
                    ...bookProps?.bookTitleStyle
                  }}
                  isVertical={isVerticalBookCard}
                >
                  {
                    useProgressForChildren ?
                    (
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                        <div style={{ width: "25px", marginTop: "5px"}}>
                          <CircularProgressbar
                            value={readingProgress * 100}
                            styles={{
                              path: {
                                stroke: "#7670FF"
                              },
                            }}
                          />
                        </div>
                        <div style={{ marginLeft: "5px", fontWeight: "bold", color: "#7670FF" }}>66%</div>
                      </div>
                    )
                    : ( showSimpleRating ?
                        <div className={defaultStyles['simple-rating']}>
                          <span className={defaultStyles['rating-value']}>{book.ratingValue}</span>/5
                        </div>
                        : <div
                          style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: "flex-end",
                            paddingRight: "16%"
                          }}
                        >
                      <RatingBar ratingValue={book.ratingValue ? book.ratingValue / 5 : 0}/>
                      <div style={{ fontWeight: "bold", marginLeft: "10px" }}>({book.ratingCount})</div>
                    </div>)
                  }
                </BookInfoCard>
              </div>
          )})
        }
      </div>
    );
  }

  return (
    isLocalBooks ? renderLocalBookList() : renderBookList()
  );
}

export default BookList;
