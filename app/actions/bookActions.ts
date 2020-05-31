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
