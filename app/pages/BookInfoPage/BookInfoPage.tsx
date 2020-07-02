import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import Carousel from 'nuka-carousel';

import { RatingBar } from '../../components/common/atoms';
import { SectionCard } from '../../components/common/molecules';
import { LibraryPageTemplate } from '../../components/common/template';

import { Review, User, Book } from '../../types';
import { currentUser, mockUsers } from '../../utils/mock-users';

import styles from './BookInfoPage.module.scss';
import ReviewBookModal from './ReviewBookModal';

import { getBookById } from '../../actions/bookActions';
import { getReviewsByBookId } from '../../actions/reviewActions';
import { downloadBook } from '../../actions/localActions';
import * as CONSTANTS from '../../utils/constants';
import * as Service from '../../utils/serviceUtils';

const { ipcRenderer } = require('electron');

const BookInfoPage = (props) => {
  let { id } = useParams();
  let history = useHistory();
  // const _book: Book = props.books.currentBook;
  // const _reviews = props.reviews.currentBookReviews;
  const [_book, _setBook] = useState<Book>();
  const [_reviews, _setReviews] = useState<Review[]>([]);
  const [authorBooks, setAuthorBooks] = useState<Book[]>([]);
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      /** REDIRECT TO PAGE NOT FOUND */
      return;
    }
    // props.getBookById(id);
    // props.getReviewsByBookId(id);
    Service.getBookById(id)
      .then((response: any) => {
        _setBook(response.book);
        if (response.book.authors && response.book.authors.length > 0) {
          Service.getAuthorBooks(response.book.authors[0].id)
            .then((response: any) => {
              setAuthorBooks(response.books);
            })
            .catch((error) => {
              console.log(error);
            })
        }
      })
      .catch((error) => {
        console.log(error);
        /** REDIRECT TO PAGE NOT FOUND */
        return;
      });
    Service.getReviewsByBookId(id)
      .then((reponse: any) => {
        _setReviews(reponse.reviews);
        setIsReviewsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsReviewsLoading(false);
      });
    Service.getSimilarBooks(id)
      .then((response: any) => {
        setSimilarBooks(response.books);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const handleAuthorBooksClick = () => {
    console.log('asdds');
    history.push({ pathname: '/search', state: { passedAuthorIds: [ _book!.authorIds![0] ], passedAuthors: [ _book!.authors![0] ] } });
  }

  const handleDownloadClick = () => {
    // console.log(downloadLink);
    const bookObj: Object = {
      id: _book!.id,
      name: _book!.title,
    }
    props.downloadBook(bookObj, _book!.downloadLink);
    // ipcRenderer.send('download-item', { url: downloadLink });
    // ipcRenderer.on('download-success', (event, arg) => {
    //   console.log(arg);
    // });
  }

  const handleCloseReviewModal= () => {
    setShowReviewModal(false);
  }

  const handleShowReviewModal = () => {
    setShowReviewModal(true);
  }

  const onNewReviewCreated = () => {
    handleCloseReviewModal();
    setIsReviewsLoading(true);
    if (!id) {
      /** REDIRECT TO PAGE NOT FOUND */
      return;
    }
    Service.getReviewsByBookId(id)
      .then((reponse: any) => {
        _setReviews(reponse.reviews);
        console.log(reponse.reviews);
        setIsReviewsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsReviewsLoading(false);
      });
  }

  const checkIsDownloading = (id) => {
    return props.local.downloadingBooks.includes(id);
  }

  return (
    <LibraryPageTemplate>
      { _book &&
        (<div>
          <div className={styles['page-content']}>
            {/* LEFT SECTION */}
            <div className={styles['left-section']}>
              {/* BOOK INFO CARD */}
              {
                (_book && _book.authors) &&
                <div className={styles['book-info-card']}>
                  <div className={styles['book-cover-and-buttons']}>
                    <div style={{ marginBottom: '5px' }}>
                      <img src={_book!.cover} alt='cover' className={styles['cover-img']}/>
                    </div>
                    <button
                      className="button-secondary"
                      style={{ marginTop: 5, marginBottom: 10 }}
                    >
                      Want to Read
                    </button>
                    {
                      !checkIsDownloading(_book.id) &&
                      <button
                        className={!_book.downloadLink ? "button-disabled" : "button-secondary"}
                        onClick={() => handleDownloadClick()}
                        disabled={!_book.downloadLink}
                      >
                        {_book.downloadLink ? 'Download' : CONSTANTS.NO_DOWNLOAD_LINK}
                      </button>
                    }
                    {
                      checkIsDownloading(_book.id) &&
                      <div>{props.local.currentDownloadingBookId === _book.id ? props.local.currentDownloadProgress : 'Pending'}</div>
                    }
                  </div>
                  <div className={styles['book-text-info']}>
                    <div className={styles['book-title']}>{_book!.title}</div>
                    <div className={styles['book-author']}>by {_book.authors[0].name}</div>
                    <div className={styles['rating-bar']}>
                      <RatingBar
                        ratingValue={_book!.ratingValue ? _book!.ratingValue / 5 : 0}
                        starStyle={{ fontSize: "1.75rem" }}
                      />
                      <div style={{ fontWeight: 600, marginLeft: "10px" }}>({_book!.ratingCount})</div>
                    </div>
                    <p className={styles['book-sypnosis']}>{_book!.sypnosis ? _book!.sypnosis : CONSTANTS.NO_BOOK_SYPNOSIS}</p>
                  </div>
                </div>
              }
              {/* REVIEWS CARD */}
              <SectionCard
                sectionName="Community Reviews"
                showSubtext={false}
              >
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
                      className={'button-secondary ' + styles['start-review-button']}
                      onClick={handleShowReviewModal}
                    >
                      Add Review
                    </button>
                  </div>
                </div>
                {/* REVIEWS */}
                {
                  _reviews &&
                  _reviews.map((review, index) => (
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
              </SectionCard>

            </div>
            {/* RIGHT SECTION */}
            <div className={styles['right-section']}>
              <SectionCard
                sectionName="Similar Books"
                wrapperStyle={{ marginTop: 0 }}
              >
                <Carousel
                  slidesToShow={4}
                  slidesToScroll={2}
                  cellSpacing={30}
                  // framePadding="0 40px"
                  // slideWidth="436px"
                  defaultControlsConfig={{
                    nextButtonText: '›',
                    prevButtonText: '‹',
                    pagingDotsStyle: { display: "none" }
                  }}
                >
                  {
                    similarBooks.map((book: Book, index: number) => (
                      <div
                        key={`book${index}`}
                        style={{ height: "fit-content" }}
                      >
                        <div
                          className={styles['sub-book-cover']}
                        >
                          <div className={styles['aspect-ratio-container']}>
                            <img
                              className={styles['sub-cover-img']}
                              src={book.cover ? book.cover : CONSTANTS.NO_BOOK_IMAGE_LINK}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </Carousel>
              </SectionCard>
              {
                (_book?.authors && _book.authors.length > 0) &&
                <div>
                  <SectionCard
                    sectionName={`About ${_book!.authors[0].name}`}
                    showSubtext={false}
                  >
                    <div className={styles['author-info-container']}>
                      <div className={styles['author-photo-name-books']}>
                        <div className={styles['author-photo']}>
                          <img
                            className={styles['author-photo']}
                            src={_book!.authors[0].photo ? _book!.authors[0].photo : CONSTANTS.NO_PHOTO_LINK}
                          />
                        </div>
                        <div className={styles['author-name-books']}>
                          <div className={styles['author-name']}>{_book!.authors[0].name}</div>
                          <div className={styles['author-books']} onClick={handleAuthorBooksClick}>{`${authorBooks.length} Books`}</div>
                        </div>
                      </div>
                      <div className={styles['author-about']}>
                        {_book!.authors[0].about ? _book!.authors[0].about : CONSTANTS.AUTHOR_NO_ABOUT}
                      </div>
                    </div>
                  </SectionCard>
                </div>
              }
            </div>
          </div>
          <ReviewBookModal
            open={showReviewModal}
            handleClose={handleCloseReviewModal}
            user={currentUser}
            book={_book!}
            onSubmitted={onNewReviewCreated}
          />
        </div>)
      }
    </LibraryPageTemplate>
  );
}

const mapStateToProps = (state) => ({
  books: state.books,
  reviews: state.reviews,
  local: state.local,
});

export default connect(mapStateToProps, { getBookById, getReviewsByBookId, downloadBook })(BookInfoPage);
