import React, { useState, useEffect } from 'react';
import defaultStyles from './BookInfoCard.css';
import Palette, {usePalette} from 'react-palette';
import {useHistory} from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import * as Local from '../../../../utils/localUtils';
import * as Constants from '../../../../utils/constants';

const useStyles = makeStyles(() =>
  createStyles({
    iconButton: {
      fontSize: "2rem"
    },
    iconButtonSmall: {
      fontSize: "0.2rem !important",
      color: "#fefefe",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      padding: "6px",
      zIndex: 100,
    },
  }),
);

// Properties
export interface BookInfoCardProps {
  id: string,
  title: string;
  authors?: string;
  cover?: string;
  subInfo?: string;
  children?: React.ReactNode;
  wrapperStyle?: React.CSSProperties;
  bookCoverStyle?: React.CSSProperties;
  bookInfoContainerStyle?: React.CSSProperties;
  bookTitleStyle?: React.CSSProperties;
  bookAuthorsStyle?: React.CSSProperties;
  bookSubInfoStyle?: React.CSSProperties;
  smartBackgroundColor?: boolean;
  isVertical?: boolean;
  onBookClick?: Function;
  showLoveButton?: boolean;
  isLoved?: boolean;
}

const BookInfoCard = ({
  id, title, authors, cover, subInfo, children,
  wrapperStyle, bookCoverStyle, bookInfoContainerStyle,
  bookTitleStyle, bookAuthorsStyle, bookSubInfoStyle,
  smartBackgroundColor, isVertical, onBookClick, showLoveButton,
  isLoved
}: BookInfoCardProps) => {
  const _cover = cover ? cover : Constants.NO_BOOK_IMAGE_LINK;
  const [_isLoved, _setIsLoved] = useState(isLoved == null ? false : isLoved)
  const { data, loading, error } = usePalette(_cover);
  const _isVertical = !(isVertical == null) ? isVertical : false;
  let history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    console.log(_isLoved);
  }, [_isLoved]);

  const _handleClick = (event: any) => {
    event.cancelBubble = true;
    if(event.stopPropagation) {
      event.stopPropagation();
    }
    if (onBookClick) {
      onBookClick(id);
    }
    else {
      history.push(`/book-info/${id}`);
    }
  }

  const _handleLoveClick = (event: any) => {
    event.cancelBubble = true;
    if(event.stopPropagation) {
      event.stopPropagation();
    }
    console.log('luv');
    Local.loveOrUnloveBook(id)
      .then((response: any) => {
        console.log(response);
        _setIsLoved(response.isLoved);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const renderHorizontally = () => {
    return (
      <div
        className={defaultStyles['wrapper'] + ' ' + defaultStyles['horizontal']}
        style={{
          backgroundColor: smartBackgroundColor ? (data.vibrant + "80") : "#FEFEFE" ,
          ...wrapperStyle
        }}
        onClick={_handleClick}
      >
        <div
          className={defaultStyles['book-cover-container']}
          style={{ ...bookCoverStyle }}
        >
          <div
            className={defaultStyles['aspect-ratio-container']}
          >
            <img
              className={defaultStyles['cover-img']}
              src={_cover}
              alt="book-cover"
            />
          </div>
        </div>
        {/* <div
          className={defaultStyles['book-cover-container']}
          style={{ ...bookCoverStyle }}
        >
          <img
            className={defaultStyles['book-cover']}
            src={_cover}
            alt="book-cover"
          />
        </div> */}
        <div
          className={defaultStyles['book-info-container']}
          style={{ ...bookInfoContainerStyle }}
        >
          <div
            className={defaultStyles['book-title']}
            style={{ ...bookTitleStyle }}
          >{title}</div>
          <div
            className={defaultStyles['book-authors']}
            style={{ ...bookAuthorsStyle }}
          >{authors}</div>
          <div
            className={defaultStyles['book-sub-info']}
            style={{ ...bookSubInfoStyle }}
          >{subInfo}</div>
          {children}
        </div>
      </div>
    );
  }

  const renderVertically = () => {
    return (
      <div
        className={defaultStyles['wrapper'] + ' ' + defaultStyles['vertical']}
        style={{
          backgroundColor: smartBackgroundColor ? (data.vibrant + "80") : "#FEFEFE" ,
          ...wrapperStyle
        }}
        onClick={_handleClick}
      >
        <div
          className={defaultStyles['book-cover-container']}
          style={{ ...bookCoverStyle }}
        >
          {
            showLoveButton &&
            <div style={{ position: 'absolute', right: 0, top: 0 }}>
              <IconButton className={classes.iconButtonSmall} onClick={_handleLoveClick}>
                {/* {
                  _isLoved
                  ? <FavoriteIcon />
                  : <FavoriteBorderIcon />
                } */}
                {
                  _isLoved &&
                  <FavoriteIcon />
                }
                {
                  !_isLoved &&
                  <FavoriteBorderIcon />
                }
              </IconButton>
            </div>
          }
          <div
            className={defaultStyles['aspect-ratio-container']}
          >
            <img
              className={defaultStyles['cover-img']}
              src={_cover}
              alt="book-cover"
            />
          </div>
        </div>
        <div
          className={defaultStyles['book-info-container']}
          style={{ ...bookInfoContainerStyle }}
        >
          <div
            className={defaultStyles['book-title']}
            style={{ ...bookTitleStyle }}
          >{title}</div>
          <div
            className={defaultStyles['book-authors']}
            style={{ ...bookAuthorsStyle }}
          >{authors}</div>
          <div
            className={defaultStyles['book-sub-info']}
            style={{ ...bookSubInfoStyle }}
          >{subInfo}</div>
          {children}
        </div>
      </div>
    );
  }

  return (
    _isVertical ? renderVertically() : renderHorizontally()
  );
}

export default BookInfoCard;
