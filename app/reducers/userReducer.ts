import { GET_CURRENT_USER, SET_CURRENT_USER, SET_TOKEN, REMOVE_TOKEN } from '../actions/types';
import * as Local from '../utils/localUtils';
import * as Constants from '../utils/constants';

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
        currentUser: action.payload,
        isLoggedIn: (action.payload && (action.payload.id != Constants.GUESS_USER_ID))
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
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
