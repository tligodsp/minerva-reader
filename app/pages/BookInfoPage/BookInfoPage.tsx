import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import Carousel from 'nuka-carousel';

import { RatingBar } from '../../components/common/atoms';
import { SectionCard } from '../../components/common/molecules';
import { LibraryPageTemplate } from '../../components/common/template';

import { Review, User, Book, LocalBook } from '../../types';
import { currentUser, mockUsers } from '../../utils/mock-users';

import styles from './BookInfoPage.module.scss';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ReviewBookModal from './ReviewBookModal';

import { getBookById } from '../../actions/bookActions';
import { getReviewsByBookId } from '../../actions/reviewActions';
import { downloadBook } from '../../actions/localActions';
import * as CONSTANTS from '../../utils/constants';
import * as Service from '../../utils/serviceUtils';
import * as Local from '../../utils/localUtils';

import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const { ipcRenderer } = require('electron');

const useStyles = makeStyles(() =>
  createStyles({
    iconButton: {
      fontSize: "2rem"
    },
  }),
);

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
  const [isDownloaded, setIsDownloaded] = useState(false);
  const classes = useStyles();
  const { theme } = props.local;

  useEffect(() => {
    if (!id) {
      /** REDIRECT TO PAGE NOT FOUND */
      return;
    }
    // props.getBookById(id);
    // props.getReviewsByBookId(id);
    checkBookIsDownloaded();
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
  }, [id]);

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
    props.downloadBook(_book, _book!.downloadLink);
    // ipcRenderer.send('download-item', { url: downloadLink });
    // ipcRenderer.on('download-success', (event, arg) => {
    //   console.log(arg);
    // });
    ipcRenderer.on(`download-end-${id}`, (event, arg) => {
      checkBookIsDownloaded();
    })
  }

  const checkBookIsDownloaded = () => {
    if (!id) {
      return;
    }
    Local.getLocalBookById(id)
      .then((response: any) => {
        if (response.localBook != null) {
          setIsDownloaded(true);
        }
        else {
          setIsDownloaded(false);
        }
      })
      .catch(err => {
        console.log(err);
        setIsDownloaded(false);
      })
  }

  const renderHomeButton = () => {
    return (
      <div style={{
        position: 'absolute',
        left: '20px',
      }}>
        <IconButton className={classes.iconButton} onClick={handleHomeClick}>
          <HomeIcon />
        </IconButton>
      </div>
    );
  }

  const handleSimilarBookClick = (id) => {
    console.log('similar');
    history.push(`/book-info/${id}`);
    // window.location.href = `/book-info/${id}`;
  }

  const handleHomeClick = () => {
    history.push(`/home`);
  }

  const handleReadBookClick = () => {
    history.push(`/reader/${id}`);
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

  const isDownloading = (id) => {
    return props.local.downloadingBooks.includes(id);
  }

  return (
    <LibraryPageTemplate
      topBarLeft={renderHomeButton()}
      backgroundColor={theme.backgroundColor}
    >
      { _book &&
        (<div>
          <div className={styles['page-content']}>
            {/* LEFT SECTION */}
            <div className={styles['left-section']}>
              {/* BOOK INFO CARD */}
              {
                (_book && _book.authors) &&
                <div
                  className={styles['book-info-card']}
                  style={{
                    backgroundColor: theme.cardBGColor,
                    color: theme.textColor
                  }}
                >
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
                      isDownloaded &&
                      <button
                        className={"button-secondary"}
                        onClick={() => handleReadBookClick()}
                      >
                        Read Book
                      </button>
                    }
                    {
                      (!isDownloaded && !isDownloading(_book.id)) &&
                      <button
                        className={!_book.downloadLink ? "button-disabled" : "button-secondary"}
                        onClick={() => handleDownloadClick()}
                        disabled={!_book.downloadLink}
                      >
                        {_book.downloadLink ? 'Download' : CONSTANTS.NO_DOWNLOAD_LINK}
                      </button>
                    }
                    {
                      (!isDownloaded && isDownloading(_book.id)) &&
                      <button
                        className={"button-disabled"}
                        disabled
                      >
                        {props.local.currentDownloadingBookId === _book.id ? `${Math.round(props.local.currentDownloadProgress * 100)}%` : 'Pending'}
                      </button>
                    }
                  </div>
                  <div className={styles['book-text-info']}>
                    <div
                      className={styles['book-title']}
                      style={{ color: theme.bookTitleColor }}
                    >{_book!.title}</div>
                    <div
                      className={styles['book-author']}
                      style={{
                        color: theme.bookAuthorsColor,
                        fontWeight: 600,
                      }}
                    >by {_book.authors[0].name}</div>
                    <div className={styles['rating-bar']}>
                      <RatingBar
                        ratingValue={_book!.ratingValue ? _book!.ratingValue / 5 : 0}
                        starStyle={{
                          fontSize: "1.75rem",
                          color: theme.starColor
                        }}
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
                wrapperStyle={{
                  backgroundColor: theme.cardBGColor,
                  color: theme.textColor
                }}
              >
                {/* START REVIEW */}
                <div
                  className={styles['review-container']}

                >
                  <div className={styles['user-avatar']}>
                    <img
                      className={styles['user-avatar']}
                      src={currentUser.profilePicture}
                    />
                  </div>
                  <div className={styles['review-bold-text-and-content']}>
                    <div className={styles['review-bold-text']}>
                      <span
                        className={styles['review-username-clickable']}
                        style={{ color: theme.usernameColor }}
                      >{currentUser.username}</span>
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
                          <span
                            className={styles['review-username-clickable']}
                            style={{ color: theme.usernameColor }}
                          >{review.user.username}</span>
                          &nbsp;rated it&nbsp;
                          <span>
                            <RatingBar
                              starStyle={{ fontSize: '1.25rem', color: theme.starColor }}
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
                wrapperStyle={{
                  backgroundColor: theme.cardBGColor,
                  color: theme.textColor,
                  marginTop: 0,
                }}
                showSubtext={false}
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
                        onClick={() => handleSimilarBookClick(book.id)}
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
                    wrapperStyle={{
                      backgroundColor: theme.cardBGColor,
                      color: theme.textColor
                    }}
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
                          <div
                            className={styles['author-name']}
                            style={{ color: theme.bookAuthorsColor }}
                          >{_book!.authors[0].name}</div>
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
            theme={theme}
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
