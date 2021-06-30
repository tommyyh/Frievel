import React from 'react';
import './suggestion.scss';

const Suggestion = ({ name, profilePic }) => {
  return (
    <div className='suggestion'>
      <img src={profilePic} alt='User profile' />
      <h4>{name}</h4>
    </div>
  );
};

export default Suggestion;
