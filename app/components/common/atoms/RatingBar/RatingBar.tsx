import React, { useRef, useEffect, useState } from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import defaultStyles from './RatingBar.css';

// Default values
const STAR_COLOR = "#E3E315";
const NUM_OF_STARS = 5;

// Properties
interface RatingBarProps {
  ratingValue?: number;
  wrapperStyle?: React.CSSProperties;
  starStyle?: React.CSSProperties;
}

const RatingBar = ({ ratingValue, wrapperStyle, starStyle } : RatingBarProps) => {
  const [_starSize, _setStarSize] = useState(0);
  const [_ratingValue, _setRatingValue] = useState(0);
  const [_numOfStars, _setNumOfStars] = useState(NUM_OF_STARS);

  useEffect(() => {
    if (ratingValue && ratingValue >= 0 && ratingValue <= 1) {
      _setRatingValue(ratingValue)
    }
  });

  const _getNumOfFilledStars = () => {
    return Math.floor(_ratingValue * _numOfStars);
  }
  const _getNumOfHalfFilledStars = () => {
    return (_getNumOfFilledStars() < (_ratingValue * _numOfStars)) ? 1 : 0;
  }
  const _getNumOfUnfilledStars = () => {
    return _numOfStars - _getNumOfFilledStars() - _getNumOfHalfFilledStars();
  }

  // Set default star size base on parent's width
  let _width = 0;
  const _ref: any = useRef(null);
  useEffect(() => {
    _width = _ref.current ? _ref.current.offsetWidth : 0;
    console.log(_width);
    _setStarSize((0.98 * _width) / NUM_OF_STARS);
  }, [_ref.current]);

  return (
    <div
      ref={_ref}
      className={defaultStyles['wrapper']}
      style={wrapperStyle}
    >
      {
        /* Filled Star */
        [...Array(_getNumOfFilledStars())].map(() => (
          <StarIcon
            style={{
              color: STAR_COLOR,
              fontSize: `${_starSize}px`,
              ...starStyle
            }}
          />
        ))
      }

      {
        /* Half filled Stars */
        [...Array(_getNumOfHalfFilledStars())].map(() => (
          <StarHalfIcon
            style={{
              color: STAR_COLOR,
              fontSize: `${_starSize}px`,
              ...starStyle
            }}
          />
        ))
      }

      {
        /* Unfilled Stars */
        [...Array(_getNumOfUnfilledStars())].map(() => (
          <StarBorderIcon
            style={{
              color: STAR_COLOR,
              fontSize: `${_starSize}px`,
              ...starStyle
            }}
          />
        ))
      }
    </div>
  );
}

export default RatingBar;
