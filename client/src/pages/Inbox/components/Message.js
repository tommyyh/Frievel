import React from 'react';
import { Link } from 'react-router-dom';
import './message.scss';

const Message = ({ name, profilePic, username, lastMessage, lastMessaged }) => {
  return (
    <Link className='message' to={`/inbox/${username}`}>
      <span className='message_left'>
        <img src={profilePic} alt='User profile' />
        <span>
          <h2>{name}</h2>
          <p>{lastMessage}</p>
        </span>
      </span>
      <h4>{lastMessaged}</h4>
    </Link>
  );
};

export default Message;