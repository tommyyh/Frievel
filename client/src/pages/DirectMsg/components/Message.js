import React from 'react';
import './message.scss';

const Message = ({ name, messageContent, profilePic, sentAt }) => {
  return (
    <div className='direct_message' onMouseOver={() => console.log('nigga')}>
      <img src={profilePic} alt='User profile' />
      <span>
        <div className='direct_message_top'>
          <h3>{name}</h3>
          <h5>{sentAt}</h5>
        </div>
        <p>{messageContent}</p>
      </span>
    </div>
  );
};

export default Message;
