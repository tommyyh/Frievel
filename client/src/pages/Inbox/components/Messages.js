import React from 'react';
import './messages.scss';
import Message from './Message';
import profilePic from '../../../assets/img/profile_pic.jpg';

const Messages = () => {
  return (
    <div className='messages'>
      <div className='messages_title'>
        <h2>My Messages</h2>
      </div>
      <Message
        name='Clement Mihailescu'
        profilePic={profilePic}
        username='clement'
        lastMessage='The current state of our...'
        lastMessaged='20h'
      />
      <Message
        name='Clement Mihailescu'
        profilePic={profilePic}
        username='clement'
        lastMessage='The current state of our...'
        lastMessaged='20h'
      />
    </div>
  );
};

export default Messages;
