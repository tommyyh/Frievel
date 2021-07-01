import React from 'react';
import { Link } from 'react-router-dom';
import './suggestion.scss';

const Suggestion = ({ name, profilePic, userTag }) => {
  return (
    <Link to={`/profile/${userTag}`} className='suggestion'>
      <img src={profilePic} alt='User profile' />
      <h4>{name}</h4>
    </Link>
  );
};

export default Suggestion;
