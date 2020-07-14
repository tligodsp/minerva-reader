import React from 'react';
import defaultStyles from './NotFoundDisplay.module.scss';
import * as Constants from '../../../../utils/constants';

interface NotFoundDisplay {
  theme: any
}

const NotFoundDisplay = ({ theme }: NotFoundDisplay) => {
  return (
    <div className={defaultStyles['container']}>
      <img
        alt="no-record"
        src={Constants.NO_RECORD_FOUND_LINK}
        className={defaultStyles['img']}
        style={{
          filter: theme.notFoundColorFilter
        }}
      />
      <div style={{ color: theme.notFoundDisplayColor }}>Sorry, no book found</div>
    </div>
  );
}

export default NotFoundDisplay;
