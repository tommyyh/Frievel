import React from 'react';
import './loading.scss';

const Loading = ({ small }) => {
  return (
    <div className={!small ? 'loading_parent' : 'loading_parent_small'}>
      <div className='loading'>
        <div className='loading_icon'>
          <div className='loading_indicator'></div>
          <div className='inner_circle'></div>
        </div>
      </div>
      {!small && <h1>Loading...</h1>}
    </div>
  );
};

export default Loading;
