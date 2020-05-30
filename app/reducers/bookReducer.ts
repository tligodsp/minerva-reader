import { FETCH_BOOKS } from '../actions/types';

const initialState = {
  allBooks: []
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return {
        ...state,
        allBooks: action.payload
      };
    default:
      return state;
  }
};

export default bookReducer;
