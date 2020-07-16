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

export const addBookToWishlist = (bookId: string) => {
  return axios.put(`users/favorites`, { action: 'ADD', favoriteId: bookId});
}

export const removeBookFromWishlist = (bookId: string) => {
  return axios.put(`users/favorites`, { action: 'REMOVE', favoriteId: bookId});
}

export const updateUserDataLink = (username: string, link: string) => {
  return axios.put(`users/update/${username}`, { dataLink: link });
}

export const updateUserPhoto = (username: string, photoLink: string) => {
  return axios.put(`users/update/${username}`, { profileAvatar: photoLink });
}
