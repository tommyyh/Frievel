import React from 'react';
import './messages.scss';
import Message from './Message';
import defaultPic from '../../../assets/img/default_profile.jpg';

const Messages = ({ currentlySelected }) => {
  return (
    <div className='messages'>
      <div className='messages_title'>
        <h2>My Messages</h2>
      </div>
      <Message
        name='Clement Mihailescu'
        profilePic={defaultPic}
        username='clement'
        lastMessage='The current state of our...'
        lastMessaged='20h'
        currentlySelected={currentlySelected}
      />
      <Message
        name='Clement Mihailescu 2'
        profilePic={defaultPic}
        username='clement2'
        lastMessage='The current state of our...'
        lastMessaged='20h'
        currentlySelected={currentlySelected}
      />
      <Message
        name='Clement Mihailescu 3'
        profilePic={defaultPic}
        username='clement3'
        lastMessage='The current state of our...'
        lastMessaged='20h'
        currentlySelected={currentlySelected}
      />
      <Message
        name='Clement Mihailescu 4'
        profilePic={defaultPic}
        username='clement4'
        lastMessage='The current state of our...'
        lastMessaged='20h'
        currentlySelected={currentlySelected}
      />
    </div>
  );
};

export default Messages;
