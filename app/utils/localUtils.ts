import { LocalBook, Genre, Author, DisplayConfig } from '../types';
import { getLocalBooks } from './mock-books';
import { getMockLocalGenres } from './mock-genres';
import { getMockLocalAuthors } from './mock-authors';
import { getMockDisplayConfig } from './mock-display-config';
const { ipcRenderer } = require('electron');
import Theme from '../styles/themes';

export const getRecentlyAddedBooks = (within = 7) => {
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
            console.log(lastXDays);
            console.log(bookDownloadedAt);
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

export const getRecentlyReadBooks = () => {
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

export const getWantToReadBooks = () => {
	const books: LocalBook[] = getLocalBooks();
	return new Promise((resolve, reject) => {
		resolve({ books });
	})
}

export const getAllDownloadedBooks = () => {
	// const books: LocalBook[] = getLocalBooks();
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

export const getLocalBookById = (id: string) => {
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
  console.log(name);
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
