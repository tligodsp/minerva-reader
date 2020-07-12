import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

interface LoadingOverlayProps {
  show: boolean;
}

const LoadingOverlay = ({ show }: LoadingOverlayProps) => {
  return (
    show ?
      (<div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          zIndex: 100
        }}
      >
        <CircularProgress size={24} className="circular-center-size-24px" />
      </div>)
      : <div></div>
  );
}

export default LoadingOverlay;
