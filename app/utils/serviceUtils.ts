import { mockBooks } from './mock-books';
import { mockReviews } from './mock-reviews';
import { Book, Review } from '../types/index';

const isElemInList = (elem: any, list: any[] | undefined) => {
  if (!list) {
    return false;
  }
  return list.findIndex(e => e === elem) != -1;
}

export const getBookById = (id: string) => {
  /** API REPLACE */
  const book: Book | undefined = mockBooks.find(book => book.id === id);
  return new Promise((resolve, reject) => {
    book ? resolve({ book }) : reject("Err");
  });
}

export const getBookByFilters = (authorIds: string[], genreIds: string[]) => {
  /** API REPLACE */
  const books = mockBooks;
  let filteredBooks: any[] = [];
  for (let authorId of authorIds) {
    filteredBooks = [ ...filteredBooks, books.filter(book => isElemInList(authorId, book.authorIds)) ];
  }
  for (let genreId of genreIds) {
    filteredBooks = [ ...filteredBooks, books.filter(book => isElemInList(genreId, book.genreIds)) ];
  }
  // remove duplicates
  filteredBooks = filteredBooks.filter((book, index) => filteredBooks.indexOf(book) === index);
  return new Promise((resolve, reject) => {
    resolve({ books: filteredBooks });
  });
}

export const getSimilarBooks = (bookId: string) => {
  /** API REPLACE */
  const books = mockBooks.slice(0, 8);
  return new Promise((resolve, reject) => {
    resolve({ books: books });
  });
}

export const getAuthorBooks = (authorId: string) => {
  const books = mockBooks;
  let authorBooks = [ ...books.filter(book => isElemInList(authorId, book.authorIds)) ];
  return new Promise((resolve, reject) => {
    resolve({ books: authorBooks });
  });
}

export const getReviewsByBookId = (bookId: string) => {
  /** API REPLACE */
  const reviews : Review[] = mockReviews.filter(review => review.book.id === bookId);
  return new Promise((resolve, reject) => {
    resolve({ reviews });
  });
}
