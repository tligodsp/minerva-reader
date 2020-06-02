import { DOWNLOAD_BOOK, ADD_BOOK_TO_DOWNLOADING_LIST, REMOVE_BOOK_FROM_DOWNLOADING_LIST,
    UPDATE_CURRENT_DOWNLOAD_PROGRESS } from './types';
const { ipcRenderer } = require('electron');

export const downloadBook = (bookId, url) => {
  return dispatch => {
    // console.log('alo');
    dispatch(addBookToDownloadingList(bookId));
    ipcRenderer.send('download-item', { bookId, url });

    ipcRenderer.on(`download-update-progress-${bookId}`, (event, arg) => {
      console.log(arg);
      dispatch(updateDownloadProgress({ progress: arg.currentProgress.percent, bookId }));
    })

    ipcRenderer.on(`download-end-${bookId}`, (event, arg) => {
      console.log('fe end ' + bookId);
      dispatch(removeBookToDownloadingList(bookId));
    })
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
