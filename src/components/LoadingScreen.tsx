import React from 'react';

function LoadingScreen() {
  return (
    <div className='loading-screen'>
      <img
        src={'/assets/loadingElement.png'}
        alt="none"
        className="loading-element"
      />
    </div>
  );
}

export default LoadingScreen;
