import { GET_CURRENT_USER, SET_CURRENT_USER, SET_TOKEN, REMOVE_TOKEN } from '../actions/types';
import * as Local from '../utils/localUtils';

const initialState = {
  currentUser: Local.getGuessUser(),
  token: '',
  isLoggedIn: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        isLoggedIn: true
      };
    case REMOVE_TOKEN:
      return {
        ...state,
        token: '',
        isLoggedIn: false,
        currentUser: Local.getGuessUser(),
      };
    default:
      return state;
  }
};

export default userReducer;
