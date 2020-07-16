import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import Carousel from 'nuka-carousel';

import { RatingBar } from '../../components/common/atoms';
import { SectionCard, LoadingOverlay } from '../../components/common/molecules';
import { LibraryPageTemplate } from '../../components/common/template';

import { Review, User, Book, LocalBook } from '../../types';
// import { currentUser, mockUsers } from '../../utils/mock-users';

import styles from './BookInfoPage.module.scss';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ReviewBookModal from './ReviewBookModal';
import ReportReviewModal from './ReportReviewModal';

import { getBookById } from '../../actions/bookActions';
import { getReviewsByBookId } from '../../actions/reviewActions';
import { downloadBook } from '../../actions/localActions';
import * as CONSTANTS from '../../utils/constants';
import * as Service from '../../utils/serviceUtils';
import * as Local from '../../utils/localUtils';

import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import EditIcon from '@material-ui/icons/Edit';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { setCurrentUserAction } from '../../actions/userActions';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const { ipcRenderer } = require('electron');

const useStyles = makeStyles(() =>
  createStyles({
    iconButton: {
      fontSize: "2rem"
    },
    iconButtonSmall: {
      fontSize: "0.2rem !important",
      color: "rgba(0, 0, 0, 0.2)",
      padding: "6px"
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
  const [showReportModal, setShowReportModal] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);
  const [isBookInfoLoading, setIsBookInfoLoading] = useState(true);
  const [isAuthorInfoLoading, setIsAuthorInfoLoading] = useState(true);
  const [isSimilarLoading, setIsSimilarLoading] = useState(true);
  const [reviewToEdit, setReviewToEdit] = useState<any>();
  const [reviewToReport, setReviewToReport] = useState<any>();
  const classes = useStyles();
  const { theme } = props.local;
  const { currentUser, isLoggedIn } = props.user;
  const [isVoting, setIsVoting] = useState(false);
  const [ agreedList, setAgreedList ] = useState<string[]>([]);
  const [ isUpdatingWishlist, setIsUpdatingWishlist ] = useState(false);

  useEffect(() => {
    if (!id) {
      /** REDIRECT TO PAGE NOT FOUND */
      return;
    }
    // props.getBookById(id);
    // props.getReviewsByBookId(id);
    setIsBookInfoLoading(true);
    setIsAuthorInfoLoading(true);
    setIsSimilarLoading(true);
    setIsReviewsLoading(true);
    setReviewToEdit(null);
    setReviewToReport(null);
    setIsVoting(false);
    setIsUpdatingWishlist(false);
    setAgreedList([]);
    checkBookIsDownloaded();
    Service.getBookById(id)
      .then((response: any) => {
        _setBook(response.book);
        setIsBookInfoLoading(false);
        if (response.book.authors && response.book.authors.length > 0) {
          Service.getAuthorBooks(response.book.authors[0].id)
            .then((response: any) => {
              setAuthorBooks(response.books);
              setIsAuthorInfoLoading(false);
            })
            .catch((error) => {
              console.log(error);
            })
        }
      })
      .catch((error) => {
        console.log(error);
        /** TODO: REDIRECT TO PAGE NOT FOUND */
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
        _setReviews([]);
      });
    Service.getSimilarBooks(id, 9)
      .then((response: any) => {
        console.log('similar');
        console.log(response);
        setSimilarBooks(response.books);
        setIsSimilarLoading(false);
      })
      .catch((error) => {
        console.log('similar err');
        console.log(error);
        setSimilarBooks([]);
      })
  }, [id]);

  useEffect(() => {
    const agreedReviews = _reviews.filter(review => isAlreadyAgreed(review));
    const newAgreedList = agreedReviews.map(review => review.id);
    setAgreedList([ ...newAgreedList ]);
  }, [_reviews]);

  const handleAuthorBooksClick = () => {
    // console.log('asdds');
    history.push({ pathname: '/search', state: { passedAuthorIds: [ _book!.authorIds![0] ], passedAuthors: [ _book!.authors![0] ] } });
  }

  const showFlagButton = (review: Review) => {
    if (!isLoggedIn ||!currentUser || !currentUser.username) {
      return false;
    }
    if (review.username == currentUser.username) {
      return false;
    }
    if (isAlreadyReported(review)) {
      return false;
    }
    return true;
  }

  const showAgreeButton = (review: Review) => {
    if (!isLoggedIn ||!currentUser || !currentUser.username) {
      return false;
    }
    return true;
  }

  const showAgreed = (review) => {
    if (!currentUser || !currentUser.username) {
      return false;
    }
    return Service.isElemInList(review.id, agreedList);
  }

  const showWishlistButton = () => {
    if (!isLoggedIn ||!currentUser || !currentUser.username || isDownloaded) {
      return false;
    }
    return true;
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
      if (Service.isElemInList(id, currentUser.wishlistIds)) {
        setIsUpdatingWishlist(true);
        Service.removeBookFromWishlist(id!)
          .then((response: any) => {
            props.setCurrentUserAction(response.user);
            setIsUpdatingWishlist(false);
          })
          .catch((error) => {
            console.log(error);
            setIsUpdatingWishlist(false);
          })
      }
    })
  }

  const handleWantToReadClick = () => {
    if (!id) {
      /** REDIRECT TO PAGE NOT FOUND */
      return;
    }
    setIsUpdatingWishlist(true);
    if (Service.isElemInList(id, currentUser.wishlistIds)) {
      Service.removeBookFromWishlist(id)
        .then((response: any) => {
          props.setCurrentUserAction(response.user);
          setIsUpdatingWishlist(false);
        })
        .catch((error) => {
          console.log(error);
          setIsUpdatingWishlist(false);
        })
    }
    else {
      Service.addBookToWishlist(id)
        .then((response: any) => {
          props.setCurrentUserAction(response.user);
          setIsUpdatingWishlist(false);
        })
        .catch((error) => {
          console.log(error);
          setIsUpdatingWishlist(false);
        })
    }
  }



  const handleVoteClick = (review: Review) => {
    if (isVoting) {
      return;
    }
    setIsVoting(true);
    if (Service.isElemInList(review.id, agreedList)) {
      Service.unvoteReview(review.id)
        .then(() => {
          setIsVoting(false);
          setAgreedList([ ...agreedList.filter(id => id != review.id) ]);
        })
        .catch((error) => {
          setIsVoting(false);
          console.log(error);
        })
    }
    else {
      Service.upvoteReview(review.id)
        .then(() => {
          setIsVoting(false);
          setAgreedList([ ...agreedList, review.id ]);
        })
        .catch((error) => {
          setIsVoting(false);
          console.log(error);
        })
    }
  }

  const isUserAlreadyReviewed = () => {
    return Service.isElemInList(currentUser.username, _reviews.map(review => review.username));
  }

  const isAlreadyReported = (review: Review) => {
    return Service.isElemInList(currentUser.username, review.reportUsers);
  }

  const isAlreadyAgreed = (review: Review) => {
    return Service.isElemInList(currentUser.username, review.upvoteUsers);
  }

  const isInWishlist = () => {
    return Service.isElemInList(id, currentUser.wishlistIds);
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

  const handleEditReviewClick = (review: Review) => {
    setReviewToEdit(review);
    handleShowReviewModal();
  }

  const handleCloseReviewModal= () => {
    setShowReviewModal(false);
    setReviewToEdit(null);
  }

  const handleShowReviewModal = () => {
    setShowReviewModal(true);
  }

  const handleReportReviewClick = (review: Review) => {
    setReviewToReport(review);
    handleShowReportModal();

  }

  const handleCloseReportModal = () => {
    setShowReportModal(false);
    setReviewToReport(null);
  }

  const handleShowReportModal = () => {
    setShowReportModal(true);
  }

  const fetchReviews = () => {
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

  const fetchBook = () => {
    setIsBookInfoLoading(true);
    if (!id) {
      /** REDIRECT TO PAGE NOT FOUND */
      return;
    }
    Service.getBookById(id)
      .then((response: any) => {
        _setBook(response.book);
        setIsBookInfoLoading(false);
      })
      .catch((error) => {
        console.log(error);
        /** TODO: REDIRECT TO PAGE NOT FOUND */
        return;
      });
  }

  const onReported = () => {
    handleCloseReportModal();
    fetchReviews();
  }

  const onReviewCreatedOrUpdate = () => {
    handleCloseReviewModal();
    fetchReviews();
    fetchBook();
  }

  const isDownloading = (id) => {
    return props.local.downloadingBooks.includes(id);
  }

  return (
    <LibraryPageTemplate
      // topBarLeft={renderHomeButton()}
      backgroundColor={theme.backgroundColor}
    >
      { true &&
        (<div>
          <div className={styles['page-content']}>
            {/* LEFT SECTION */}
            <div className={styles['left-section']}>
              {/* BOOK INFO CARD */}
              {
                isBookInfoLoading &&
                <div
                  className={styles['book-info-card']}
                  style={{
                    backgroundColor: theme.cardBGColor,
                    color: theme.textColor,
                    position: 'relative',
                    height: '500px'
                  }}
                >
                  <LoadingOverlay show={isBookInfoLoading} />
                </div>
              }
              {
                ( !isBookInfoLoading && _book && _book.authors) &&
                <div
                  className={styles['book-info-card']}
                  style={{
                    backgroundColor: theme.cardBGColor,
                    color: theme.textColor,
                  }}
                >
                  <div className={styles['book-cover-and-buttons']}>
                    <div style={{ marginBottom: '5px' }}>
                      <img src={_book!.cover} alt='cover' className={styles['cover-img']}/>
                    </div>
                    <div style={{ height: '5px' }}/>
                    {
                      showWishlistButton() &&
                      <button
                        className="button"
                        // className="button-secondary"
                        style={{
                          // marginTop: 5,
                          marginBottom: 10,
                          position: 'relative',
                          cursor: isUpdatingWishlist ? 'unset' : 'pointer'
                        }}
                        onClick={handleWantToReadClick}
                      >
                        <LoadingOverlay show={isUpdatingWishlist}/>
                        {
                          isInWishlist() ? 'Un-wishlist Book' : 'Wishlist Book'
                        }
                      </button>
                    }
                    {
                      isDownloaded &&
                      <button
                        className={"button"}
                        // className={"button-secondary"}
                        onClick={() => handleReadBookClick()}
                      >
                        Read Book
                      </button>
                    }
                    {
                      (!isDownloaded && !isDownloading(_book.id)) &&
                      <button
                        className={!_book.downloadLink ? "button-disabled" : "button"}
                        // className={!_book.downloadLink ? "button-disabled" : "button-secondary"}
                        onClick={() => handleDownloadClick()}
                        disabled={!_book.downloadLink}
                      >
                        {_book.downloadLink ? 'Download' : CONSTANTS.NO_DOWNLOAD_LINK}
                      </button>
                    }
                    {
                      (!isDownloaded && isDownloading(_book.id)) &&
                      <button
                        className={"button"}
                        // className={"button-secondary"}
                        disabled
                        style={{
                          position: 'relative',
                          cursor: isUpdatingWishlist ? 'none' : 'pointer'
                        }}
                      >
                        <LoadingOverlay show={true}/>
                        {props.local.currentDownloadingBookId === _book.id ? `${Math.round(props.local.currentDownloadProgress * 100)}%` : 'Pending'}
                      </button>
                    }
                    {/* {
                      (!isDownloaded && isDownloading(_book.id)) &&
                      <button
                        className={"button-disabled"}
                        disabled
                      >
                        {props.local.currentDownloadingBookId === _book.id ? `${Math.round(props.local.currentDownloadProgress * 100)}%` : 'Pending'}
                      </button>
                    } */}
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
                      {/* <div style={{ fontWeight: 600, marginLeft: "10px" }}>({_book!.ratingCount})</div> */}
                    </div>
                    <p className={styles['book-sypnosis']}>{_book!.sypnosis ? _book!.sypnosis : CONSTANTS.NO_BOOK_SYPNOSIS}</p>
                  </div>
                </div>
              }
              {/* REVIEWS CARD */}
              {
                (isReviewsLoading) &&
                <SectionCard
                  sectionName="Community Reviews"
                  showSubtext={false}
                  wrapperStyle={{
                    backgroundColor: theme.cardBGColor,
                    color: theme.textColor,
                    height: '300px',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    borderRadius: '20px'
                  }}>
                    <LoadingOverlay show={isReviewsLoading}/>
                  </div>
                </SectionCard>
              }
              {
                (!isReviewsLoading) &&
                <SectionCard
                  sectionName="Community Reviews"
                  showSubtext={false}
                  wrapperStyle={{
                    backgroundColor: theme.cardBGColor,
                    color: theme.textColor
                  }}
                >
                  {/* START REVIEW */}
                  {
                    (isLoggedIn && !isUserAlreadyReviewed()) &&
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
                          , start your review of {_book?.title}
                        </div>
                        <button
                          className={'button ' + styles['start-review-button']}
                          // className={'button-secondary ' + styles['start-review-button']}
                          onClick={handleShowReviewModal}
                        >
                          Add Review
                        </button>
                      </div>
                    </div>
                  }
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
                        <div style={{ flex: 1, position: 'relative' }}>
                          <div style={{
                            position: 'absolute',
                            right: '20px',
                          }}>
                            {
                              (review.username == currentUser.username) &&
                              <IconButton className={classes.iconButtonSmall} onClick={() => handleEditReviewClick(review)}>
                                <EditIcon />
                              </IconButton>
                            }
                            {
                              showAgreeButton(review) &&
                              <IconButton
                                className={classes.iconButtonSmall}
                                onClick={() => handleVoteClick(review)}
                              >
                                {
                                  showAgreed(review)
                                  ? <ThumbUpIcon style={{ color: theme.iconColor }}/>
                                  : <ThumbUpIcon />
                                }
                              </IconButton>
                            }
                            {
                              (showFlagButton(review)) &&
                              <IconButton className={classes.iconButtonSmall} onClick={() => handleReportReviewClick(review)}>
                                <FlagIcon />
                              </IconButton>
                            }
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </SectionCard>
              }

            </div>
            {/* RIGHT SECTION */}
            <div className={styles['right-section']}>
              {
                isSimilarLoading &&
                <SectionCard
                  sectionName="Similar Books"
                  showSubtext={false}
                  wrapperStyle={{
                    backgroundColor: theme.cardBGColor,
                    color: theme.textColor,
                    height: '300px',
                    marginTop: 0,
                    position: 'relative',
                    borderRadius: '20px'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    borderRadius: '20px'
                  }}>
                    <LoadingOverlay show={isSimilarLoading}/>
                  </div>
                </SectionCard>
              }
              {
                !isSimilarLoading &&
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
              }
              {
                isBookInfoLoading &&
                <SectionCard
                  sectionName={`About Author`}
                  showSubtext={false}
                  wrapperStyle={{
                    backgroundColor: theme.cardBGColor,
                    color: theme.textColor,
                    height: '300px',
                    position: 'relative',
                    borderRadius: '20px'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    borderRadius: '20px'
                  }}>
                    <LoadingOverlay show={isAuthorInfoLoading}/>
                  </div>
                </SectionCard>
              }
              {
                (!isBookInfoLoading && _book?.authors && _book.authors.length > 0) &&
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
                          {
                            isAuthorInfoLoading &&
                            <div
                              style={{
                                position: 'relative',
                                height: '20px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}>
                                <LoadingOverlay show={isAuthorInfoLoading} isLinear noOverlay/>
                            </div>
                          }
                          {
                            !isAuthorInfoLoading &&
                            <div className={styles['author-books']} onClick={handleAuthorBooksClick}>{`${authorBooks.length} Books`}</div>
                          }
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
          {
            !isBookInfoLoading &&
            <ReviewBookModal
              open={showReviewModal}
              handleClose={handleCloseReviewModal}
              user={currentUser}
              book={_book!}
              onSubmitted={onReviewCreatedOrUpdate}
              theme={theme}
              isEdit={reviewToEdit != null}
              reviewToEdit={reviewToEdit}
            />
          }
          {
            reviewToReport &&
            <ReportReviewModal
              open={showReportModal}
              handleClose={handleCloseReportModal}
              review={reviewToReport}
              onSubmitted={onReported}
              theme={theme}
            />
          }
        </div>)
      }
    </LibraryPageTemplate>
  );
}

const mapStateToProps = (state) => ({
  books: state.books,
  reviews: state.reviews,
  local: state.local,
  user: state.users,
});

export default connect(mapStateToProps, { getBookById, getReviewsByBookId, downloadBook, setCurrentUserAction })(BookInfoPage);
