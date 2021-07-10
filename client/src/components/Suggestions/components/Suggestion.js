import React from 'react';
import { Link } from 'react-router-dom';
import './suggestion.scss';

const Suggestion = ({ name, profilePic, userTag }) => {
  return (
    <Link to={`/profile/${userTag}`} className='suggestion'>
      <img src={profilePic} alt='User profile' />
      <span>
        <h4>{name}</h4>
        <h5>@{userTag}</h5>
      </span>
    </Link>
  );
};

export default Suggestion;
