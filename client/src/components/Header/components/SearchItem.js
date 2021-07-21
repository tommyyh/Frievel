import React from 'react';
import './searchItem.scss';

const SearchItem = ({ profilePic, name, username }) => {
  return (
    <div className='search_item'>
      <img src={profilePic} alt='User profile' />
      <span>
        <h5>{name}</h5>
        <h6>{username}</h6>
      </span>
    </div>
  );
};

export default SearchItem;
