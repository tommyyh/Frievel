import React from 'react';
import { Link } from 'react-router-dom';
import './message.scss';

const Message = ({
  name,
  profilePic,
  lastMessage,
  lastMessaged,
  currentlySelected,
  chat_id,
  seen,
}) => {
  return (
    <>
      {currentlySelected === chat_id ? (
        <Link
          className='message'
          to={`/inbox/${chat_id}`}
          style={{ background: '#3e3f41' }}
        >
          <span className='message_left'>
            <img src={profilePic} alt='User profile' />
            <span>
              <h2 style={!seen ? { color: '#fff' } : {}}>{name}</h2>
              <p style={!seen ? { color: '#fff' } : {}}>{lastMessage}</p>
            </span>
          </span>
          <div className='message_right'>
            <h4>{lastMessaged}</h4>
          </div>
        </Link>
      ) : (
        <Link className='message' to={`/inbox/${chat_id}`}>
          <span className='message_left'>
            <img src={profilePic} alt='User profile' />
            <span>
              <h2 style={!seen ? { color: '#fff' } : {}}>{name}</h2>
              <p style={!seen ? { color: '#fff' } : {}}>{lastMessage}</p>
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
