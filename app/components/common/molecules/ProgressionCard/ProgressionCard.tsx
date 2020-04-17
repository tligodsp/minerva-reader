import React from 'react';
import defaultStyles from './ProgressionCard.css';

interface ProgressionCardProps {
  wrapperStyles?: React.CSSProperties,
}

const ProgressionCard = ({ wrapperStyles }: ProgressionCardProps) => {
  return (
    <div
      className={defaultStyles['wrapper']}
      style={{ ...wrapperStyles }}
    >
      <div className={defaultStyles['aspect-ratio-container']}></div>
    </div>
  );
}

export default ProgressionCard;
