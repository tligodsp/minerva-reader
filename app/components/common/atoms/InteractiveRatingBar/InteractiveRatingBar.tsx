import React, { useEffect, useState } from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import defaultStyles from './IteractiveRatingBar.module.scss';

// Default values
const STAR_COLOR = "#E3E315";
const NUM_OF_STARS = 5;
const STAR_SIZE = 30;
const STAR_TYPES = {
  BORDER: "BORDER",
  HALF_FILLED: "HALF_FILLED",
  FILLED: "FILLED",
}
const HOVER_SIDES = {
  LEFT: -1,
  RIGHT: 1,
}

// Properties
interface InteractiveRatingBarProps {
  ratingValue?: number;
  wrapperStyle?: React.CSSProperties;
  starStyle?: React.CSSProperties;
  starSize?: number;
}

const InteractiveStar = ({ starSize, starStyle, ratingValue, starIndex, onChange, onClick }) => {
  const [_starToShow, _setStarToShow] = useState(STAR_TYPES.BORDER);

  useEffect(() => {
    if (ratingValue >= starIndex + 1) {
      _setStarToShow(STAR_TYPES.FILLED);
    }
    else if (ratingValue == starIndex + 0.5) {
      _setStarToShow(STAR_TYPES.HALF_FILLED);
    }
    else {
      _setStarToShow(STAR_TYPES.BORDER);
    }
  }, [ratingValue]);

  const onHover = (side: number) => {
    if (side == HOVER_SIDES.LEFT) {
      onChange(starIndex + 0.5);
    }
    else {
      onChange(starIndex + 1);
    }
  }

  const onLeave = () => {
    onChange(-1);
  }

  return (
    <div className={defaultStyles['star-container']}>
      {
        _starToShow ==STAR_TYPES.BORDER &&
        <StarBorderIcon
          style={{
            color: STAR_COLOR,
            fontSize: `${starSize}px`,
            ...starStyle
          }}
        />
      }
      {
        _starToShow ==STAR_TYPES.HALF_FILLED &&
        <StarHalfIcon
          style={{
            color: STAR_COLOR,
            fontSize: `${starSize}px`,
            ...starStyle
          }}
        />
      }
      {
        _starToShow ==STAR_TYPES.FILLED &&
        <StarIcon
          style={{
            color: STAR_COLOR,
            fontSize: `${starSize}px`,
            ...starStyle
          }}
        />
      }
      <div
        className={defaultStyles['zone']}
        onClick={onClick}
      >
        <div
          className={defaultStyles['half-zone']}
          onMouseEnter={() => onHover(HOVER_SIDES.LEFT)}
          onMouseLeave={onLeave}
        />
        <div
          className={defaultStyles['half-zone']}
          onMouseEnter={() => onHover(HOVER_SIDES.RIGHT)}
          onMouseLeave={onLeave}
        />
      </div>
    </div>
  );
}

const InteractiveRatingBar = ({ ratingValue, wrapperStyle, starStyle, starSize } : InteractiveRatingBarProps) => {
  const [_ratingValue, _setRatingValue] = useState(0);
  const [_chosenRatingValue, _setChosenRatingValue] = useState(0);
  const _starSize = starSize ? starSize : STAR_SIZE;
  const _numOfStars = NUM_OF_STARS

  useEffect(() => {
    if (ratingValue && ratingValue >= 0 && ratingValue <= 1) {
      _setRatingValue(ratingValue)
    }
  });

  const onStarHover = (value: number) => {
    if (value == -1) {
      _setRatingValue(_chosenRatingValue);
    }
    else {
      _setRatingValue(value);
    }
    console.log(value);
  }

  const onStarClick = () => {
    _setChosenRatingValue(_ratingValue);
  }

  return (
    <div
      className={defaultStyles['wrapper']}
      style={wrapperStyle}
    >
      {
        [...Array(_numOfStars)].map((value, index) => (
          <InteractiveStar
            starSize={_starSize}
            starStyle={starStyle}
            ratingValue={_ratingValue}
            starIndex={index}
            onChange={onStarHover}
            onClick={onStarClick}
          />
        ))
      }
    </div>
  );
}

export default InteractiveRatingBar;
