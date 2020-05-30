import { FETCH_BOOKS } from './types';
/** TODO: API CALL **/
import * as MockBook from '../utils/mock-books';

export const fetchBooks = () => {
  return dispatch => {
    dispatch({
      type: FETCH_BOOKS,
      payload: MockBook.mockBooks
    });
  }
}
