import { FETCH_BOOKS, GET_BOOK_BY_ID } from './types';
/** TODO: API CALL **/
import * as MockBook from '../utils/mock-books';

export const fetchBooks = () => {
  return dispatch => {
    dispatch({
      type: FETCH_BOOKS,
      payload: MockBook.mockBooks,
    });
  }
}

export const getBookById = (id) => {
  const book = MockBook.mockBooks.find(book => book.id === id);
  return dispatch => {
    dispatch({
      type: GET_BOOK_BY_ID,
      payload: book,
    });
  }
}

// export const getSimilarBooks = (id: string) => {
//   const books = [ ...MockBook.mockBooks ];
//   return dispatch => {
//     dispatch({
//       type: GET_SIMILAR_BOOKS,
//       payload: books,
//     });
//   }
// }

// export const getBooksByAuthor = (authorId: string) => {
//   const books = [ ...MockBook.mockBooks ];
//   return dispatch => {
//     dispatch({
//       type: GET_BOOKS_BY_AUTHOR,
//       payload: books,
//     });
//   }
// }
