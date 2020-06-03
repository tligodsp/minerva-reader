import { DOWNLOAD_BOOK, ADD_BOOK_TO_DOWNLOADING_LIST, REMOVE_BOOK_FROM_DOWNLOADING_LIST,
    UPDATE_CURRENT_DOWNLOAD_PROGRESS } from './types';
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
