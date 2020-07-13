import axios from 'axios';
import { ReviewInput } from '../types';

export const getReviewByBookId = (bookId: string) => {
  return axios.get(`/reviews/${bookId}/book`);
}

export const createReview = (review: ReviewInput) => {
  return axios.post(`/reviews`, { bookId: review.bookId, comment: review.content, rating: review.ratingValue });
}

export const updateReview = (id: string, review: ReviewInput) => {
  return axios.put(`/reviews/${id}`, { bookId: review.bookId, comment: review.content, rating: review.ratingValue });
}

export const deleteReview = (id: string) => {
  return axios.delete(`/reviews/${id}`);
}

export const reportReview = (reason: string, reviewId: string) => {
  return axios.post(`/reports`, { reason, reviewId });
}

export const upvoteReview = (id: string) => {
  return axios.post(`reviews/${id}/action`, { action: "upvote" });
}

export const unvoteReview = (id: string) => {
  return axios.post(`reviews/${id}/action`, { action: "unvote" });
}
