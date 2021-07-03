import React from 'react';
import { Link } from 'react-router-dom';
import './message.scss';

const Message = ({
  name,
  profilePic,
  username,
  lastMessage,
  lastMessaged,
  currentlySelected,
}) => {
  return (
    <>
      {currentlySelected === username ? (
        <Link
          className='message'
          to={`/inbox/${username}`}
          style={{ background: '#3e3f41' }}
        >
          <span className='message_left'>
            <img src={profilePic} alt='User profile' />
            <span>
              <h2>{name}</h2>
              <p>{lastMessage}</p>
            </span>
          </span>
          <div className='message_right'>
            <h4>{lastMessaged}</h4>
          </div>
        </Link>
      ) : (
        <Link className='message' to={`/inbox/${username}`}>
          <span className='message_left'>
            <img src={profilePic} alt='User profile' />
            <span>
              <h2>{name}</h2>
              <p>{lastMessage}</p>
            </span>
          </span>
          <div className='message_right'>
            <h4>{lastMessaged}</h4>
          </div>
        </Link>
      )}
    </>
  );
};

export default Message;
