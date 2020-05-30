import { GET_CURRENT_USER, SET_CURRENT_USER } from '../actions/types';

const initialState = {
  currentUser: {}
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
    default:
      return state;
  }
};

export default userReducer;
