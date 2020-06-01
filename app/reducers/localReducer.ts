import { DOWNLOAD_BOOK, ADD_BOOK_TO_DOWNLOADING_LIST, REMOVE_BOOK_FROM_DOWNLOADING_LIST } from '../actions/types';

const initialState = {
  downloadingBooks: []
}

const localReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOWNLOAD_BOOK:
      return {
        ...state
      };
    case ADD_BOOK_TO_DOWNLOADING_LIST:
      return {
        ...state,
        downloadingBooks: [ ...state.downloadingBooks, action.payload ]
      }
    case REMOVE_BOOK_FROM_DOWNLOADING_LIST:
      return {
        ...state,
        downloadingBooks: [ ...state.downloadingBooks.filter(bookId => bookId !== action.payload) ]
      }
    default:
      return state;
  }
}

export default localReducer;
