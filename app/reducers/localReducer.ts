import { DOWNLOAD_BOOK, ADD_BOOK_TO_DOWNLOADING_LIST, REMOVE_BOOK_FROM_DOWNLOADING_LIST,
    UPDATE_CURRENT_DOWNLOAD_PROGRESS } from '../actions/types';

const initialState = {
  downloadingBooks: [],
  currentDownloadProgress: 0,
  currentDownloadingBookId: '',
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
    case UPDATE_CURRENT_DOWNLOAD_PROGRESS:
      return {
        ...state,
        currentDownloadProgress: action.payload.progress,
        currentDownloadingBookId: action.payload.bookId,
      }
    default:
      return state;
  }
}

export default localReducer;
