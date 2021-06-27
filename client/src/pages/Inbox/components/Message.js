import React from 'react';
import { Link } from 'react-router-dom';
import './message.scss';
import profilePic from '../../../assets/img/profile_pic.jpg';

const Message = () => {
  return (
    <Link className='message' to='/inbox/clement'>
      <span className='message_left'>
        <img src={profilePic} alt='User profile' />
        <span>
          <h2>Clement Mihailescu</h2>
          <p>The current state of our...</p>
        </span>
      </span>
      <h4>20h</h4>
    </Link>
  );
};

export default Message;
