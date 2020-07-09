import { LocalBook, Genre, Author } from '../types';
import { getLocalBooks } from './mock-books';
import { getMockLocalGenres } from './mock-genres';
import { getMockLocalAuthors } from './mock-authors';

export const getRecentlyAddedBooks = () => {
	const books: LocalBook[] = getLocalBooks();
	return new Promise((resolve, reject) => {
		resolve({ books });
	})
}

export const getRecentlyReadBooks = () => {
	const books: LocalBook[] = getLocalBooks();
	return new Promise((resolve, reject) => {
		resolve({ books });
	})
}

export const getWantToReadBooks = () => {
	const books: LocalBook[] = getLocalBooks();
	return new Promise((resolve, reject) => {
		resolve({ books });
	})
}

export const getAllDownloadedBooks = () => {
	const books: LocalBook[] = getLocalBooks();
	return new Promise((resolve, reject) => {
		resolve({ books });
	})
}

export const getLocalGenres = () => {
  const genres: Genre[] = getMockLocalGenres();
  return new Promise((resolve, reject) => {
    resolve({ genres });
  });
}

export const getLocalAuthors = () => {
  const authors: Author[] = getMockLocalAuthors();
  return new Promise((resolve, reject) => {
    resolve({ authors });
  });
}

export const getLocalBookById = (id: string) => {
  const allBooks: LocalBook[] = getLocalBooks();
  const book: LocalBook | undefined = allBooks.find(localBook => localBook.book.id === id);
  return new Promise((resolve, reject) => {
    if (book != null) {
      resolve({ localBook: book });
    }
    else {
      reject('Not found');
    }
  })
}
