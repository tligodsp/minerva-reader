import { DOWNLOAD_BOOK, ADD_BOOK_TO_DOWNLOADING_LIST, REMOVE_BOOK_FROM_DOWNLOADING_LIST,
    UPDATE_CURRENT_DOWNLOAD_PROGRESS, LOCAL_GET_ALL_DOWNLOADED, LOCAL_GET_RECENTLY_ADDED,
    LOCAL_GET_RECENTLY_READ, LOCAL_GET_WANT_TO_READ, SET_DEFAULT_DISPLAY } from './types';
import { getLocalBooks } from '../utils/mock-books';
import { DisplayConfig } from '../types';
const { ipcRenderer } = require('electron');

export const downloadBook = (bookObj, url) => {
  return dispatch => {
    dispatch(addBookToDownloadingList(bookObj.id));
    ipcRenderer.send('download-item', { bookObj, url });

    ipcRenderer.on(`download-update-progress-${bookObj.id}`, (event, arg) => {
      console.log(arg);
      dispatch(updateDownloadProgress({ progress: arg.currentProgress.percent, bookId: bookObj.id }));
    })

    ipcRenderer.on(`download-end-${bookObj.id}`, (event, arg) => {
      dispatch(removeBookToDownloadingList(bookObj.id));
    })
  }
}

export const getDefaultDisplay = () => {
  return dispatch => {
    ipcRenderer.send('get-default-display-style');
    ipcRenderer.on('get-default-display-style-done', (event, res) => {
      if (res.result == 'SUCCESS') {
        dispatch(setDefaultDisplay(res.displayStyle));
      }
      else {
        dispatch(setDefaultDisplay({theme: 'light',fontSize: 'medium'}));
      }
    });
  }
}

export const setDefaultDisplay = (displayStyle: DisplayConfig) => {
  return {
    type: SET_DEFAULT_DISPLAY,
    payload: displayStyle,
  }
}

export const addBookToDownloadingList = (id) => {
  return {
    type: ADD_BOOK_TO_DOWNLOADING_LIST,
    payload: id,
  }
}

export const removeBookToDownloadingList = (id) => {
  return {
    type: REMOVE_BOOK_FROM_DOWNLOADING_LIST,
    payload: id,
  }
}

export const updateDownloadProgress = (progressObj) => {
  return {
    type: UPDATE_CURRENT_DOWNLOAD_PROGRESS,
    payload: progressObj,
  }
}

// export const getRecentlyAdded = () => {
//   return {
//     type: LOCAL_GET_RECENTLY_ADDED,
//     payload: getLocalBooks(),
//   }
// }

// export const getRecentlyRead = () => {
//   return {
//     type: LOCAL_GET_RECENTLY_READ,
//     payload: getLocalBooks(),
//   }
// }

// export const getWantToRead = () => {
//   return {
//     type: LOCAL_GET_WANT_TO_READ,
//     payload: getLocalBooks(),
//   }
// }

// export const getAllDownloaded = () => {
//   return {
//     type: LOCAL_GET_ALL_DOWNLOADED,
//     payload: getLocalBooks(),
//   }
// }
