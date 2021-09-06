import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import spinner from '../../react-logo.svg';

const LoadingSpinner = () => {
  const { promiseInProgress } = usePromiseTracker({ delay: 1000 });

  const renderContent = () => {
    if (!promiseInProgress) {
      return null;
    }

    return (
      <div className="loading-spinner">
        <img src={spinner} alt="Loading..." />
      </div>
    );
  };

  return renderContent();
};

export default LoadingSpinner;
