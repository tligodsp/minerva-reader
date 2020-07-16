import { LocalBook, Genre, Author, DisplayConfig, Book } from '../types';
import { getLocalBooks } from './mock-books';
import { getMockLocalGenres } from './mock-genres';
import { getMockLocalAuthors } from './mock-authors';
import { getMockDisplayConfig } from './mock-display-config';
import * as Constants from '../utils/constants';
const { ipcRenderer } = require('electron');
import Theme from '../styles/themes';

export const downloadUserData = (url: string) => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('download-user-data', { url });
    ipcRenderer.on('download-user-data-done', (event, res) => {
      // console.log(res);
      resolve({ result: 'SUCCESS' });
    })
  });
}

export const getUserData = () => {
	return new Promise((resolve, reject) => {
    ipcRenderer.send('get-user-data');
    ipcRenderer.on('get-user-data-done', (event, res) => {
      try {
        if (res.result == 'SUCCESS' && res.userData) {
          resolve({ userData: res.userData });
        }
        else {
          resolve({ userData: {} });
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
	})
}

export const getRecentlyAddedBooksUnsyncIncluded = (within = 7) => {
  // const books: LocalBook[] = getLocalBooks();
	return new Promise((resolve, reject) => {
    // resolve({ books });
    ipcRenderer.send('get-user-data');
    ipcRenderer.on('get-user-data-done', (event, res) => {
      try {
        if (res.result == 'SUCCESS' && res.userData.localBooks) {
          let lastXDays : Date = new Date();
          lastXDays.setDate(lastXDays.getDate() - within);
          let recentlyAddedBooks = res.userData.localBooks.filter(book => {
            const bookDownloadedAt : Date = new Date(book.dateAdded);
            // console.log(lastXDays);
            // console.log(bookDownloadedAt);
            return lastXDays <= bookDownloadedAt;
          });
          recentlyAddedBooks.sort((book1, book2) => {
            return Date.parse(book2.dateAdded) - Date.parse(book1.dateAdded);
          })
          resolve({ books: recentlyAddedBooks });
        }
        else {
          resolve({ books: [] });
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
	})
}

export const getRecentlyAddedBooks = (within = 7) => {
  return new Promise((resolve, reject) => {
    Promise.all([getRecentlyAddedBooksUnsyncIncluded(within), getUnsyncedBooks()])
      .then((responses: any[]) => {
        const allRecentlyAdded = responses[0].books;
        const unsynced = responses[1].books;
        const syncedRecentlyAddedBooks = allRecentlyAdded.filter(lbook => unsynced.findIndex(ulbook => ulbook.book.id === lbook.book.id) === -1);
        resolve({ books: syncedRecentlyAddedBooks });
      })
      .catch(error => {
        reject({error, books: []})
      })
	})
}

export const getRecentlyReadBooksUnsyncedIncluded = () => {
  const within = 30;
	// const books: LocalBook[] = getLocalBooks();
	return new Promise((resolve, reject) => {
    // resolve({ books });
    ipcRenderer.send('get-user-data');
    ipcRenderer.on('get-user-data-done', (event, res) => {
      try {
        if (res.result == 'SUCCESS' && res.userData.localBooks) {
          let lastXDays : Date = new Date();
          lastXDays.setDate(lastXDays.getDate() - within);
          let recentlyAddedBooks = res.userData.localBooks.filter(book => {
            if (!book.lastRead) {
              return false;
            }
            const bookLastReadAt : Date = new Date(book.lastRead);
            return lastXDays <= bookLastReadAt;
          });
          recentlyAddedBooks.sort((book1, book2) => {
            return Date.parse(book2.lastRead) - Date.parse(book1.lastRead);
          })
          resolve({ books: recentlyAddedBooks });
        }
        else {
          resolve({ books: [] });
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
	})
}

export const getRecentlyReadBooks = () => {
  return new Promise((resolve, reject) => {
    Promise.all([getRecentlyReadBooksUnsyncedIncluded(), getUnsyncedBooks()])
      .then((responses: any[]) => {
        const allRecentlyRead = responses[0].books;
        const unsynced = responses[1].books;
        const syncedRecentlyReadBooks = allRecentlyRead.filter(lbook => unsynced.findIndex(ulbook => ulbook.book.id === lbook.book.id) === -1);
        resolve({ books: syncedRecentlyReadBooks });
      })
      .catch(error => {
        reject({error, books: []})
      })
	})
}

export const getLovedBooksUnsyncedIncluded = () => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('get-user-data');
    ipcRenderer.on('get-user-data-done', (event, res) => {
      try {
        if (res.result == 'SUCCESS' && res.userData.localBooks) {
          let lovedBooks = res.userData.localBooks.filter(book => book.isLoved);
          resolve({ books: lovedBooks });
        }
        else {
          resolve({ books: [] });
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
	})
}

export const getLovedBooks = () => {
	return new Promise((resolve, reject) => {
    Promise.all([getLovedBooksUnsyncedIncluded(), getUnsyncedBooks()])
      .then((responses: any[]) => {
        const allLoved = responses[0].books;
        const unsynced = responses[1].books;
        const syncedLovedBooks = allLoved.filter(lbook => unsynced.findIndex(ulbook => ulbook.book.id === lbook.book.id) === -1);
        resolve({ books: syncedLovedBooks });
      })
      .catch(error => {
        reject({error, books: []})
      })
	})
}

export const getWantToReadBooks = () => {
	const books: LocalBook[] = getLocalBooks();
	return new Promise((resolve, reject) => {
		resolve({ books });
	})
}

export const getAllDownloadedBooksUnsyncedIncluded = () => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('get-user-data');
    ipcRenderer.on('get-user-data-done', (event, res) => {
      if (res.result == 'SUCCESS' && res.userData.localBooks) {
        resolve({ books: res.userData.localBooks });
      }
      else {
        resolve({ books: [] });
      }
    });
	})
}

export const getAllDownloadedBooks = () => {
	// const books: LocalBook[] = getLocalBooks();
	return new Promise((resolve, reject) => {
    Promise.all([getAllDownloadedBooksUnsyncedIncluded(), getUnsyncedBooks()])
      .then((responses: any[]) => {
        const allDownloaded = responses[0].books;
        const unsynced = responses[1].books;
        const syncedDownloadedBooks = allDownloaded.filter(lbook => unsynced.findIndex(ulbook => ulbook.book.id === lbook.book.id) === -1);
        resolve({ books: syncedDownloadedBooks });
      })
      .catch(error => {
        reject({error, books: []})
      })
	})
}

export const getLocalGenres = () => {
  // const genres: Genre[] = getMockLocalGenres();
  return new Promise((resolve, reject) => {
    // resolve({ genres });
    ipcRenderer.send('get-user-data');
    ipcRenderer.on('get-user-data-done', (event, res) => {
      if (res.result == 'SUCCESS' && res.userData.localGenres) {
        resolve({ genres: res.userData.localGenres });
      }
      else {
        resolve({ genres: [] });
      }
    });
  });
}

export const getLocalAuthors = () => {
  // const authors: Author[] = getMockLocalAuthors();
  return new Promise((resolve, reject) => {
    // resolve({ authors });
    ipcRenderer.send('get-user-data');
    ipcRenderer.on('get-user-data-done', (event, res) => {
      if (res.result == 'SUCCESS' && res.userData.localAuthors) {
        resolve({ authors: res.userData.localAuthors });
      }
      else {
        resolve({ authors: [] });
      }
    });
  });
}

export const getUnsyncedBooks = () => {
  // const authors: Author[] = getMockLocalAuthors();
  return new Promise((resolve, reject) => {
    // resolve({ authors });
    ipcRenderer.send('get-unsynced-or-corrupted-books');
    ipcRenderer.on('get-unsynced-or-corrupted-books-done', (event, res) => {
      if (res.result == 'SUCCESS') {
        const books = res.unsyncedBooks.map(uBook => ({ ...uBook, bookPhotoPath: Constants.NO_BOOK_IMAGE_LINK }))
        resolve({ books });
      }
      else {
        reject(res.error);
      }
    });
  });
}

export const checkBookSynced = (bookId: string) => {
  return new Promise((resolve, reject) => {
    getUnsyncedBooks()
      .then((response: any) => {
        const unsynced = response.books;
        const isSynced = unsynced.findIndex(ulbooks => ulbooks.book.id === bookId) === -1;
        resolve({ isSynced });
      })
      .catch(err => {
        reject(err);
      })

  });
}

export const getLocalBookByIdUnsyncedIncluded = (id: string) => {
  // const allBooks: LocalBook[] = getLocalBooks();
  // const book: LocalBook | undefined = allBooks.find(localBook => localBook.book.id === id);
  return new Promise((resolve, reject) => {
    ipcRenderer.send('get-user-data');
    ipcRenderer.on('get-user-data-done', (event, res) => {
      if (res.result == 'SUCCESS' && res.userData.localBooks) {
        const book: LocalBook | undefined = res.userData.localBooks.find(localBook => localBook.book.id === id);
        if (book != null) {
          resolve({ localBook: book });
        }
        else {
          reject('Not found');
        }
      }
      else {
        resolve({ localBook: null });
      }
    });
  });
}

export const getLocalBookById = (id: string) => {
  // const allBooks: LocalBook[] = getLocalBooks();
  // const book: LocalBook | undefined = allBooks.find(localBook => localBook.book.id === id);
  return new Promise((resolve, reject) => {
    getLocalBookByIdUnsyncedIncluded(id)
      .then((response: any) => {
        const { localBook } = response;
        if (localBook) {
          checkBookSynced(id)
            .then((response: any) => {
              const { isSynced } = response;
              if (isSynced) {
                resolve({ localBook });
              }
              else {
                resolve({ localBook: null });
              }
            })
            .catch((error) => {
              reject(error)
            })
        }
        else {
          resolve({ localBook: null });
        }
      })
      .catch((error) => {
        reject(error);
      })
	})
}

export const getCommonDisplayConfig = () => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('get-default-display-style');
    ipcRenderer.on('get-default-display-style-done', (event, res) => {
      if (res.result == 'SUCCESS') {
        resolve({ displayStyle: res.displayStyle });
      }
      else {
        resolve({ displayStyle: {theme: 'light',fontSize: 'medium'} });
      }
    });
  });
}

export const getDefaultDisplayConfig = () => {
  return {
    theme: 'light',
    fontSize: 'medium'
  };
  // return new Promise((resolve, reject) => {
  //   ipcRenderer.send('get-default-display-style');
  //   ipcRenderer.on('get-default-display-style-done', (event, res) => {
  //     if (res.result == 'SUCCESS') {
  //       resolve({ displayStyle: res.displayStyle });
  //     }
  //     else {
  //       resolve({ displayStyle: {theme: 'light',fontSize: 'medium'} });
  //     }
  //   });
  // });
}

export const getGuessUser = () => {
  return {
    id: 'guess123456',
    username: 'Guess',
    profilePicture: `https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png`,
  };
}

export const getThemeByName = (name: string) => {
  // console.log(name);
  if (name == 'dark') {
    return Theme.dark;
  }
  return Theme.light;
}

export const updateBookProgress = (bookId: string, progressCFI: string) => {
  ipcRenderer.send('update-book-reading-progress', { bookId, progressCFI });
}

export const updateBookDisplayConfig = (bookId: string, displayConfig: DisplayConfig, useCommonDisplay: boolean) => {
  ipcRenderer.send('update-book-display-config', { bookId, displayConfig, useCommonDisplay });
}

export const setCommonDisplayConfig = (commonDisplay: DisplayConfig) => {
  ipcRenderer.send('set-default-display-style', { displayStyle: commonDisplay });
}

export const loveOrUnloveBook = (bookId: string) => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('love-or-unlove-book', { bookId });
    ipcRenderer.on('love-or-unlove-book-done', (event, res) => {
      if (res.result == 'SUCCESS') {
        resolve({ result: res.result, isLoved: res.isLoved });
      }
      else {
        reject({ result: res.result });
      }
    });
  });
}
