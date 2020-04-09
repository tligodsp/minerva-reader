import React from 'react';
import defaultStyles from './BookInfoCard.css';

// Properties
interface BookInfoCardProps {
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
}

const BookInfoCard = ({
  title, authors, cover, subInfo, children,
  wrapperStyle, bookCoverStyle, bookInfoContainerStyle,
  bookTitleStyle, bookAuthorsStyle, bookSubInfoStyle
}: BookInfoCardProps) => {
  const _cover = cover ? cover : 'https://lazioeventi.com/wp-content/uploads/2014/05/No-image-available.jpg';
  return (
    <div
      className={defaultStyles['wrapper']}
      style={{ ...wrapperStyle }}
    >
      <div
        className={defaultStyles['book-cover-container']}
        style={{ ...bookCoverStyle }}
      >
        <img
          className={defaultStyles['book-cover']}
          src={_cover}
          alt="book-cover"
        />
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

export default BookInfoCard;
