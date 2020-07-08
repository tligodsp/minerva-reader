import { LocalBook } from '../types';
import { getLocalBooks } from './mock-books';

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
