import React from 'react';
import defaultStyles from './BookInfoCard.css';
import Palette, {usePalette} from 'react-palette';
import {useHistory} from 'react-router-dom';

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
}

const BookInfoCard = ({
  id, title, authors, cover, subInfo, children,
  wrapperStyle, bookCoverStyle, bookInfoContainerStyle,
  bookTitleStyle, bookAuthorsStyle, bookSubInfoStyle,
  smartBackgroundColor, isVertical, onBookClick
}: BookInfoCardProps) => {
  const _cover = cover ? cover : 'https://lazioeventi.com/wp-content/uploads/2014/05/No-image-available.jpg';
  const { data, loading, error } = usePalette(_cover);
  const _isVertical = !(isVertical == null) ? isVertical : false;
  let history = useHistory();

  const _handleClick = () => {
    if (onBookClick) {
      onBookClick(id);
    }
    else {
      history.push(`/book-info/${id}`);
    }
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
