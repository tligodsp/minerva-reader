import { GET_REVIEWS_BY_BOOK_ID } from '../actions/types';

const initialState = {
  currentBookReviews: []
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_BY_BOOK_ID:
      return {
        ...state,
        currentBookReviews: action.payload
      }
    default:
      return state
  }
};

export default reviewReducer;
