import { GET_CURRENT_USER, SET_CURRENT_USER, SET_TOKEN, REMOVE_TOKEN } from './types';
import { currentUser } from '../utils/mock-users';
import { Dispatch } from '../reducers/types';

export const setCurrentUserAction = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});
export const setTokenAction = (tokenStr) => ({
  type: SET_TOKEN,
  payload: tokenStr,
});
export const removeTokenAction = () => ({
  type: REMOVE_TOKEN,
});

export const getCurrentUser = () => {
  return (dispatch: any) => {
    dispatch({
      type: GET_CURRENT_USER,
      payload: currentUser
    });
  }
}
