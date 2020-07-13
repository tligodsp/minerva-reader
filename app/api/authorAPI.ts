import axios from 'axios';

export const getAuthors = () => {
  return axios.get(`/authors`);
}

export const getAuthorById = (id: string) => {
  return axios.get(`/authors/${id}`);
}

export const getBooksByAuthorId = (id: string) => {
  return axios.get(`/authors/${id}/books`);
}
