import { GET_REVIEWS_BY_BOOK_ID } from './types';
import { Review } from '../types/index';
/** TODO: API CALL **/
import * as MockReviews from '../utils/mock-reviews';

export const getReviewsByBookId = (bookId) => {
  const reviews : Review[] = MockReviews.mockReviews.filter(review => review.book.id === bookId);
  return dispatch => {
    dispatch({
      type: GET_REVIEWS_BY_BOOK_ID,
      payload: reviews
    });
  };
}
