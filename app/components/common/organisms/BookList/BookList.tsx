import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import defaultStyles from './BookList.css';
import { BookInfoCard } from '../../molecules';
import { RatingBar } from '../../atoms';
import { Book, Author, Genre } from '../../../../types';

interface BookInfoCardStyleProps {
  wrapperStyle?: React.CSSProperties;
  bookCoverStyle?: React.CSSProperties;
  bookInfoContainerStyle?: React.CSSProperties;
  bookTitleStyle?: React.CSSProperties;
  bookAuthorsStyle?: React.CSSProperties;
  bookSubInfoStyle?: React.CSSProperties;
}

interface BookListProps {
  books: Book[];
  bookTitleFontSize?: string;
  bookDefaultFontSize?: string;
  wrapperStyle?: React.CSSProperties;
  bookContainerStyle?: React.CSSProperties;
  bookProps?: BookInfoCardStyleProps;
  useProgressForSubInfo?: boolean;
  useProgressForChildren?: boolean;
  // TODO: Add book card display type: Rating|Progress
}

const BookList = ({
    books, bookTitleFontSize, bookDefaultFontSize,
    wrapperStyle, bookContainerStyle, bookProps,
    useProgressForSubInfo, useProgressForChildren }
  : BookListProps) => {
  const _books = books ? books : [];
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
    if (useProgressForSubInfo) {
      // TODO: Get Progress by book and user
      return 'Chapter 1';
    }
    else  {
      return book.genres ? _getGenresString(book.genres) : "";
    }
  }

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

export default BookList;
