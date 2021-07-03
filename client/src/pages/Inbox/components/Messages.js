import React from 'react';
import './messages.scss';
import Message from './Message';
import profilePic from '../../../assets/img/profile_pic.jpg';

const Messages = ({ currentlySelected }) => {
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
        currentlySelected={currentlySelected}
      />
      <Message
        name='Clement Mihailescu 2'
        profilePic={profilePic}
        username='clement2'
        lastMessage='The current state of our...'
        lastMessaged='20h'
        currentlySelected={currentlySelected}
      />
      <Message
        name='Clement Mihailescu 3'
        profilePic={profilePic}
        username='clement3'
        lastMessage='The current state of our...'
        lastMessaged='20h'
        currentlySelected={currentlySelected}
      />
      <Message
        name='Clement Mihailescu 4'
        profilePic={profilePic}
        username='clement4'
        lastMessage='The current state of our...'
        lastMessaged='20h'
        currentlySelected={currentlySelected}
      />
    </div>
  );
};

export default Messages;
