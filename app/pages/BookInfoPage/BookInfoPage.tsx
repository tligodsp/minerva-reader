import React from 'react';
import Divider from '@material-ui/core/Divider';
import { useParams } from 'react-router-dom';

import { RatingBar } from '../../components/common/atoms';
import { LibraryPageTemplate } from '../../components/common/template';
import { Review, User } from '../../types';
import { mockBooks } from '../../utils/mock-books';
import { currentUser, mockUsers } from '../../utils/mock-users';
import styles from './BookInfoPage.css';

const BookInfoPage = () => {
  const _mockBooks = mockBooks.slice(0, 12);
  let { id } = useParams();
  const _book = _mockBooks.find(book => book.id == id);

  const getReviewListWrapper = (reviewList: Review[]) => {
    // TODO: Write a data util
    interface ReviewWrapper extends Review {
      user: User
    }
    let reviewListWrapper: ReviewWrapper[] = [];
    for (let review of reviewList) {
      const commentUser: User | undefined = mockUsers.find((user) => user.id === review.userId);
      reviewListWrapper.push({
        ...review,
        user: commentUser!
      })
    }
    return reviewListWrapper;
  };

  return (
    <LibraryPageTemplate>
      <div className={styles['page-content']}>
        {/* LEFT SECTION */}
        <div className={styles['left-section']}>
          {/* BOOK INFO CARD */}
          <div className={styles['book-info-card']}>
            <div className={styles['book-cover-and-buttons']}>
              <div style={{ marginBottom: '5px' }}>
                <img src={_book!.cover} alt='cover' className={styles['cover-img']}/>
              </div>
              <button
                className={styles['button-secondary']}
              >
                Want to Read
              </button>
              <button
                className={styles['button-secondary']}
              >
                Download
              </button>
            </div>
            <div className={styles['book-text-info']}>
              <div className={styles['book-title']}>{_book!.title}</div>
              <div className={styles['book-author']}>by {_book!.authors![0].name}</div>
              <div className={styles['rating-bar']}>
                <RatingBar ratingValue={_book!.ratingValue ? _book!.ratingValue / 5 : 0}/>
                <div style={{ fontWeight: 600, marginLeft: "10px" }}>({_book!.ratingCount})</div>
              </div>
              <p className={styles['book-sypnosis']}>{_book!.sypnosis}</p>
            </div>
          </div>
          {/* REVIEWS CARD */}
          <div
            className={styles['review-card']}
          >
            <div className={styles['review-card-header']}>
              <div>Community Reviews</div>
              {/* <div className={defaultStyles['header-subtext']}>More</div> */}
            </div>
            <Divider style={{ margin: "10px 0" }}/>
            {/* START REVIEW */}
            <div className={styles['review-container']}>
              <div className={styles['user-avatar']}>
                <img
                  className={styles['user-avatar']}
                  src={currentUser.profilePicture}
                />
              </div>
              <div className={styles['review-bold-text-and-content']}>
                <div className={styles['review-bold-text']}>
                  <span className={styles['review-username-clickable']}>{currentUser.displayName}</span>
                  , start your review of Deception Point
                </div>
                <button
                  className={styles['button-secondary'] + ' ' + styles['start-review-button']}
                >
                  Add Review
                </button>
              </div>
            </div>
            {/* REVIEWS */}
            {
              _book!.reviews &&
              getReviewListWrapper(_book!.reviews).map((review, index) => (
                <div
                  id={`review${index}`}
                  className={styles['review-container']}
                >
                  <div className={styles['user-avatar']}>
                    <img
                      className={styles['user-avatar']}
                      src={review.user.profilePicture}
                    />
                  </div>
                  <div className={styles['review-bold-text-and-content']}>
                    <div className={styles['review-bold-text']}>
                      <span className={styles['review-username-clickable']}>{review.user.displayName}</span>
                      &nbsp;rated it&nbsp;
                      <span>
                        <RatingBar
                          starStyle={{ fontSize: '1.25rem' }}
                          wrapperStyle={{ display: 'flex' }}
                          ratingValue={review.ratingValue / 5}
                        />
                      </span>
                    </div>
                    <p>{review.content}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        {/* RIGHT SECTION */}
        <div className={styles['right-section']}></div>
      </div>
    </LibraryPageTemplate>
  );
}

export default BookInfoPage;
