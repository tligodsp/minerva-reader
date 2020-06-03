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
// const BOOKSHELF_PATH = path.join(__dirname, "bookss");

let downloadingQueue: any[] = [];

const continueDownload = (win, info) => {
  downloadingQueue = downloadingQueue.filter(downloadItem => downloadItem.info.bookObj.id !== info.bookObj.id);
  if (downloadingQueue.length > 0) {
    downloadBook(win, downloadingQueue[0]);
  }
}

const downloadBook = (win, { event, info }) => {
  const downloadTo = path.join(app.getPath('userData'), BOOKSHELF_FOLDER_NAME, info.bookObj.id);
  if (fs.existsSync(downloadTo)) {
    console.log('blah');
    win.webContents.send(`folder-already-exist`, { blah: 'blah' });
    continueDownload(win, info);
    return;
  }
  download(win!, info.url, {
    directory: downloadTo,
    onProgress: currentProgress => {
      win.webContents.send(`download-update-progress-${info.bookObj.id}`, {
        currentProgress,
      })
    }
  })
  .then(() => {
    // console.log(`success-${info.bookObj.id}`);
    fs.writeFileSync(
      path.join(downloadTo, "data.json"),
      JSON.stringify(info.bookObj, null, 2)
    );
    event.sender.send(`download-end-${info.bookObj.id}`, { result: 'SUCCESS', url: info.url});
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
