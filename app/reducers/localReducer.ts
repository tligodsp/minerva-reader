import { DOWNLOAD_BOOK, ADD_BOOK_TO_DOWNLOADING_LIST, REMOVE_BOOK_FROM_DOWNLOADING_LIST,
    UPDATE_CURRENT_DOWNLOAD_PROGRESS, SET_DEFAULT_DISPLAY } from '../actions/types';
import { getDefaultDisplayConfig, getThemeByName } from '../utils/localUtils';

const initialState = {
  downloadingBooks: [],
  currentDownloadProgress: 0,
  currentDownloadingBookId: '',
  // commonTheme: getDefaultDisplayConfig(),
  // navBarTheme: 'light',
  theme: getThemeByName('light'),
  commonDisplay: {
    theme: 'light',
    fontSize: 'medium'
  }
  // theme: getThemeByName('dark'),
}

const localReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOWNLOAD_BOOK:
      return {
        ...state
      };
    case SET_DEFAULT_DISPLAY:
      return {
        ...state,
        commonDisplay: action.payload,
        theme: getThemeByName(action.payload.theme)
      }
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
