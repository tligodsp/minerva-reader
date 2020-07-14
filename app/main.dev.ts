/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { download } from 'electron-dl';
import { parseJSON } from 'jquery';
import * as Utils from './mainUtils';
const fs = require("fs");
// import { download } from 'edl';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences:
      process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true'
        ? {
            nodeIntegration: true
          }
        : {
            preload: path.join(__dirname, 'dist/renderer.prod.js')
          }
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.maximize();
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

// const BOOKSHELF_PATH = 'books';
const BOOKSHELF_FOLDER_NAME = 'books';
const APP_NAME = 'Minerva Reader';
const USER_DATA_NAME = 'user-data.json';
// const BOOKSHELF_PATH = path.join(__dirname, "bookss");

let downloadingQueue: any[] = [];

const continueDownload = (win, info) => {
  downloadingQueue = downloadingQueue.filter(downloadItem => downloadItem.info.bookObj.id !== info.bookObj.id);
  if (downloadingQueue.length > 0) {
    downloadBook(win, downloadingQueue[0]);
  }
}

const downloadBook = (win, { event, info }) => {
  const downloadTo = path.join(app.getPath('documents'), APP_NAME, BOOKSHELF_FOLDER_NAME, info.bookObj.id);
  if (fs.existsSync(downloadTo)) {
    console.log('blah');
    win.webContents.send(`folder-already-exist`, { blah: 'blah' });
    continueDownload(win, info);
    return;
  }
  /** Download Book */
  download(win!, info.url, {
    directory: downloadTo,
    onProgress: currentProgress => {
      win.webContents.send(`download-update-progress-${info.bookObj.id}`, {
        currentProgress,
      })
    }
  })
  .then((fileRes: any) => {
    const fileName = fileRes.getFilename();
    /** Download Photo */
    download(win!, info.bookObj.cover, {
      directory: downloadTo,
    })
    .then((photoRes: any) => {
      const photoResponse = photoRes;
      /** Save Book JSON File */
      const userDataPath = path.join(app.getPath('documents'), APP_NAME, BOOKSHELF_FOLDER_NAME, USER_DATA_NAME);
      const timeNow = new Date();
      const newLocalBookData = {
        book: info.bookObj,
        bookFilePath: path.join(downloadTo, fileName),
        bookPhotoPath: path.join(downloadTo, photoResponse.getFilename()),
        readingProgress: 0,
        readingTime: 0,
        dateAdded: timeNow.toISOString(),
      };
      fs.writeFileSync(
        path.join(downloadTo, `${info.bookObj.id}.json`),
        JSON.stringify(newLocalBookData, null, 2)
      );
      let userData;
      if (fs.existsSync(userDataPath)) {
        const userRawData = fs.readFileSync(userDataPath);
        userData = JSON.parse(userRawData);
        if (!userData.localBooks) {
          userData.localBooks = [];
        }
        userData = {
          ...userData,
          localBooks: [
            ...userData.localBooks,
            newLocalBookData
          ]
        };
        /** Save local genres */
        if (userData.localGenres) {
          userData = {
            ...userData,
            localGenres: Utils.addBookGenresToGenreList(userData.localGenres, info.bookObj)
          }
        }
        else {
          userData = {
            ...userData,
            localGenres: [ ...info.bookObj.genres ]
          }
        }
        /** Save local authors */
        if (userData.localAuthors) {
          userData = {
            ...userData,
            localAuthors: Utils.addBookAuthorsToAuthorList(userData.localAuthors, info.bookObj)
          }
        }
        else {
          userData = {
            ...userData,
            localAuthors: [ ...info.bookObj.authors ]
          }
        }
      }
      else {
        userData = {
          localBooks: [ newLocalBookData ],
          localGenres: [ ...info.bookObj.genres ],
          localAuthors: [ ...info.bookObj.authors ],
        };
      }
      fs.writeFileSync(
        userDataPath,
        JSON.stringify(userData, null, 2)
      );
      event.sender.send(`download-end-${info.bookObj.id}`, { result: 'SUCCESS', url: info.url});
    })
  })
  .catch((err) => {
    // console.log(`${err}-${info.bookObj.id}`);
    event.sender.send(`download-end-${info.bookObj.id}`, { result: 'ERROR', err});
  })
  .finally(() => {
    // console.log('end download ' + info.bookObj.id);
    // downloadingQueue = downloadingQueue.filter(downloadItem => downloadItem.info.bookObj.id !== info.bookObj.id);
    // if (downloadingQueue.length > 0) {
    //   downloadBook(win, downloadingQueue[0]);
    // }
    continueDownload(win, info);
  });
}

ipcMain.on('download-item', async (event, info) => {
  downloadingQueue.push({ event, info });
  const win = BrowserWindow.getFocusedWindow();

  if (downloadingQueue[0].info.bookObj.id === info.bookObj.id) {
    downloadBook(win, downloadingQueue[0]);
  }
});

ipcMain.on('get-default-display-style', (event) => {
  try {
    const userDataPath = path.join(app.getPath('documents'), APP_NAME, BOOKSHELF_FOLDER_NAME, USER_DATA_NAME);
    let userData: any = {};
    let displayStyle = {};
    if (fs.existsSync(userDataPath)) {
      const userRawData = fs.readFileSync(userDataPath);
      userData = JSON.parse(userRawData);
      if (userData && userData.defaultDisplayStyle) {
        displayStyle = userData.defaultDisplayStyle;
      }
      else if (userData && !userData.defaultDisplayStyle) {
        userData = {
          ...userData,
          defaultDisplayStyle: {
            theme: 'light',
            fontSize: 'medium',
          }
        };
        fs.writeFileSync(
          userDataPath,
          JSON.stringify(userData, null, 2)
        );
        displayStyle = userData.defaultDisplayStyle;
      }
      else {
        userData = {
          defaultDisplayStyle: {
            theme: 'light',
            fontSize: 'medium',
          }
        };
        fs.writeFileSync(
          userDataPath,
          JSON.stringify(userData, null, 2)
        );
        displayStyle = userData.defaultDisplayStyle;
      }
    }
    else {
      userData = {
        defaultDisplayStyle: {
          theme: 'light',
          fontSize: 'medium',
        }
      };
      fs.writeFileSync(
        userDataPath,
        JSON.stringify(userData, null, 2)
      );
      displayStyle = userData.defaultDisplayStyle;
    }
    event.sender.send(`get-default-display-style-done`, { result: 'SUCCESS', displayStyle });
  } catch (error) {
    event.sender.send(`get-default-display-style-done`, { result: 'ERROR', displayStyle: {} });
  }
});

ipcMain.on('set-default-display-style', (event, info) => {
  try {
    const userDataPath = path.join(app.getPath('documents'), APP_NAME, BOOKSHELF_FOLDER_NAME, USER_DATA_NAME);
    let userData: any = {};
    let displayStyle = info.displayStyle;
    if (fs.existsSync(userDataPath)) {
      const userRawData = fs.readFileSync(userDataPath);
      userData = JSON.parse(userRawData);
      if (userData) {
        userData.defaultDisplayStyle = displayStyle;
      }
      else {
        userData = { defaultDisplayStyle: displayStyle };
      }
    }
    else {
      userData = { defaultDisplayStyle: displayStyle };
    }
    fs.writeFileSync(
      userDataPath,
      JSON.stringify(userData, null, 2)
    );
  } catch (error) {
    console.log(error);
  }
});

ipcMain.on('get-user-data', (event) => {
  try {
    const userDataPath = path.join(app.getPath('documents'), APP_NAME, BOOKSHELF_FOLDER_NAME, USER_DATA_NAME);
    let userData = {};
    if (fs.existsSync(userDataPath)) {
      const userRawData = fs.readFileSync(userDataPath);
      userData = JSON.parse(userRawData);
    }
    event.sender.send(`get-user-data-done`, { result: 'SUCCESS', userData });
  }
  catch(err) {
    event.sender.send(`get-user-data-done`, { result: 'ERROR', userData: {} });
  };
});

ipcMain.on('update-book-reading-progress', (event, info) => {
  try {
    const userDataPath = path.join(app.getPath('documents'), APP_NAME, BOOKSHELF_FOLDER_NAME, USER_DATA_NAME);
    let userData: any = {};
    if (fs.existsSync(userDataPath)) {
      const userRawData = fs.readFileSync(userDataPath);
      userData = JSON.parse(userRawData);
      if (userData && userData.localBooks) {
        let bookIndex = userData.localBooks.findIndex(lb => lb.book.id === info.bookId);
        if (bookIndex != -1) {
          let localBooks =  userData.localBooks;
          let book = localBooks[bookIndex];
          const timeNow = new Date();
          book.lastRead = timeNow.toISOString();
          book.readingProgressCFI = info.progressCFI;
          localBooks[bookIndex] = book;
          userData.localBooks = [ ...localBooks ];
          fs.writeFileSync(
            userDataPath,
            JSON.stringify(userData, null, 2)
          );
        }
      }
    }
  }
  catch(err) {
    // event.sender.send(`get-user-data-done`, { result: 'ERROR', userData: {} });
    console.log(err);
  };
});

ipcMain.on('update-book-display-config', (event, info) => {
  try {
    const userDataPath = path.join(app.getPath('documents'), APP_NAME, BOOKSHELF_FOLDER_NAME, USER_DATA_NAME);
    let userData: any = {};
    if (fs.existsSync(userDataPath)) {
      const userRawData = fs.readFileSync(userDataPath);
      userData = JSON.parse(userRawData);
      if (userData && userData.localBooks) {
        let bookIndex = userData.localBooks.findIndex(lb => lb.book.id === info.bookId);
        if (bookIndex != -1) {
          let localBooks =  userData.localBooks;
          let book = localBooks[bookIndex];
          book.displayConfig = info.displayConfig;
          book.useCommonDisplay = info.useCommonDisplay;
          localBooks[bookIndex] = book;
          userData.localBooks = [ ...localBooks ];
          fs.writeFileSync(
            userDataPath,
            JSON.stringify(userData, null, 2)
          );
        }
      }
    }
  }
  catch(err) {
    // event.sender.send(`get-user-data-done`, { result: 'ERROR', userData: {} });
    console.log(err);
  };
});

ipcMain.on('love-or-unlove-book', (event, info) => {
  try {
    // const userDataPath = path.join(app.getPath('documents'), APP_NAME, BOOKSHELF_FOLDER_NAME, USER_DATA_NAME);
    // let userData: any = {};
    // let bookId = info.bookId;
    // if (fs.existsSync(userDataPath)) {
    //   const userRawData = fs.readFileSync(userDataPath);
    //   userData = JSON.parse(userRawData);
    //   if (userData && userData.lovedBookIds) {
    //     if (userData.lovedBookIds.findIndex(id => id === bookId) !== -1) {
    //       userData.lovedBookIds = [ userData.lovedBookIds.filter(id => id !== bookId) ];
    //     }
    //     else {
    //       userData.lovedBookIds = [ ...userData.lovedBookIds, bookId ]
    //     }
    //   }
    //   else {
    //     userData = { lovedBookIds: [ bookId ] };
    //   }
    // }
    // else {
    //   userData = { lovedBookIds: [ bookId ] };
    // }
    // fs.writeFileSync(
    //   userDataPath,
    //   JSON.stringify(userData, null, 2)
    // );
    const userDataPath = path.join(app.getPath('documents'), APP_NAME, BOOKSHELF_FOLDER_NAME, USER_DATA_NAME);
    let userData: any = {};
    let isLovedRes = false;
    if (fs.existsSync(userDataPath)) {
      const userRawData = fs.readFileSync(userDataPath);
      userData = JSON.parse(userRawData);
      if (userData && userData.localBooks) {
        let bookIndex = userData.localBooks.findIndex(lb => lb.book.id === info.bookId);
        if (bookIndex != -1) {
          let localBooks =  userData.localBooks;
          let book = localBooks[bookIndex];
          if (!book.isLoved) {
            book.isLoved = true;
            isLovedRes = true;
          }
          else {
            book.isLoved = false;
            isLovedRes = false;
          }
          localBooks[bookIndex] = book;
          userData.localBooks = [ ...localBooks ];
          fs.writeFileSync(
            userDataPath,
            JSON.stringify(userData, null, 2)
          );
        }
      }
    }
    event.sender.send(`love-or-unlove-book-done`, { result: 'SUCCESS', isLoved: isLovedRes });
  } catch (error) {
    console.log(error);
    event.sender.send(`love-or-unlove-book-done`, { result: 'ERROR' });
  }
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', createWindow);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
