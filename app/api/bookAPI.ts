import axios from 'axios';

export const getBooks = (query = '', limit = 1000) => {
  return axios.get(`/books?limit=${limit}&q=${query}`);
}

export const getBookById = (id: string) => {
  return axios.get(`/books/book/${id}`);
}

export const getSimilarBooks = (id: string, limit = 1000) => {
  return axios.get(`/books/book/${id}/similar?limit=${limit}`);
}

export const getHighRatedBooks = (limit = 1000) => {
  return axios.get(`books/get-high-rated?limit=${limit}`);
}

export const getNewBooks = (limit = 1000) => {
  return axios.get(`books/get-latest?limit=${limit}`);
}

export const getPopularBooks = (limit = 1000) => {
  return axios.get(`books/get-popular?limit=${limit}`);
}

export const getRecommendBooks = (favoriteGenreIds: string[], limit = 1000) => {
  return axios.get(`books/recommend?limit=${limit}&categories=${favoriteGenreIds.join('*')}`);
}
