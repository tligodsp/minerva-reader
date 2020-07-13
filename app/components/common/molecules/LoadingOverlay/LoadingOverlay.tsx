import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

interface LoadingOverlayProps {
  show: boolean;
  isLinear?: boolean;
  noOverlay?: boolean;
}

const LoadingOverlay = ({ show, isLinear, noOverlay }: LoadingOverlayProps) => {
  return (
    show ?
      (<div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: noOverlay ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.3)',
          zIndex: 100,
          borderRadius: 'inherit',
        }}
      >
        {
          !isLinear &&
          <CircularProgress size={24} className="circular-center-size-24px" />
        }
        {
          isLinear &&
          <LinearProgress className='linear-center' />
        }
      </div>)
      : <div></div>
  );
}

export default LoadingOverlay;
