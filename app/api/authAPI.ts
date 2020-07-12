import axios from 'axios';

export const login = (username: string, password: string) => {
  return axios.post('/login', { username, password });
}

export const signUp = (username: string, password: string, favoriteCategoryIds: string[] = []) => {
  return axios.post('/sign-up', { fullName: username, username, password, favoriteCategoryIds });
}

export const checkToken = (tokenStr: string) => {
  console.log(tokenStr);
  return axios.get(`/check-token/${tokenStr}`);
}
