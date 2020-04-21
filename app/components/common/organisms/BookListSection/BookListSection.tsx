import React from 'react';
import defaultStyles from './BookListSection.css';
// import Button from '@material-ui/core/Button';

interface BookListSectionProps {
  sectionTitle: string;
  buttonLabel?: string;
  children: React.ReactNode;
  wrapperStyle?: React.CSSProperties;
  headerContainerStyle?: React.CSSProperties;
  buttonColor?: string;
  showButton?: boolean;
}

const BookListSection = ({
  sectionTitle, buttonLabel, children,
  wrapperStyle, headerContainerStyle, buttonColor,
  showButton
}: BookListSectionProps) => {
  const _showButton = showButton != undefined ? showButton : true;
  return (
    <div
      className={defaultStyles['wrapper']}
      style={{ ...wrapperStyle }}
    >
      <div
        className={defaultStyles['header-container']}
        style={{ ...headerContainerStyle }}
      >
        <div>{sectionTitle}</div>
        {
          _showButton &&
          (<button
            className={defaultStyles['button']}
            style={buttonColor ? { background: buttonColor } : undefined }
          >
            <span>View All</span>
          </button>)
        }
      </div>
      {children}
    </div>
  );
}

export default BookListSection;
