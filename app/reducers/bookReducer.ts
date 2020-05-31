import { FETCH_BOOKS, GET_BOOK_BY_ID } from '../actions/types';

const initialState = {
  allBooks: [],
  currentBook: {},
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return {
        ...state,
        allBooks: action.payload
      };
    case GET_BOOK_BY_ID:
      return {
        ...state,
        currentBook: action.payload
      }
    default:
      return state;
  }
};

export default bookReducer;
