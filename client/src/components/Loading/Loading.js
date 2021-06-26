import React from 'react';
import './loading.scss';

const Loading = () => {
  return (
    <div className='loading_parent'>
      <div className='loading'>
        <div className='loading_icon'>
          <div className='loading_indicator'></div>
          <div className='inner_circle'></div>
        </div>
      </div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;
