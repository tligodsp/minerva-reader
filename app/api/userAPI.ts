import axios from 'axios';

export const getUserById = (id: string) => {
  return axios.get(`/users/get/${id}`);
}

export const getUserByUsername = (username: string) => {
  return axios.get(`/users/get-username/${username}`);
}

export const addFavoriteGenre = (favoriteCategoryId: string) => {
  return axios.put(`users/favorites`, { action: 'ADD', favoriteCategoryId});
}
