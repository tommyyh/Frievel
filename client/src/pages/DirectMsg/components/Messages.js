import React from 'react';
import './messages.scss';
import Message from './Message';
import profilePic from '../../../assets/img/profile_pic.jpg';

const Messages = () => {
  return (
    <div className='direct_messages'>
      <Message
        name='Clement Mihailescu'
        messageContent='Lorem ipsum dolar amet!'
        profilePic={profilePic}
        sentAt='06/25/2021 - 9:11'
      />
      <Message
        name='Clement Mihailescu'
        messageContent='Lorem ipsum dolar amet dolar amet Lorem ipsum dolar amet dolar amet! Lorem ipsum dolar amet dolar amet!'
        profilePic={profilePic}
        sentAt='06/25/2021 - 9:13'
      />
      <Message
        name='Clement Mihailescu'
        messageContent='Lorem!'
        profilePic={profilePic}
        sentAt='06/25/2021 - 9:14'
      />
      <Message
        name='Clement Mihailescu'
        messageContent='Lorem ipsum dolar amet!'
        profilePic={profilePic}
        sentAt='06/25/2021 - 9:11'
      />
      <Message
        name='Clement Mihailescu'
        messageContent='Lorem ipsum dolar amet dolar amet Lorem ipsum dolar amet dolar amet! Lorem ipsum dolar amet dolar amet!'
        profilePic={profilePic}
        sentAt='06/25/2021 - 9:13'
      />
      <Message
        name='Clement Mihailescu'
        messageContent='Lorem!'
        profilePic={profilePic}
        sentAt='06/25/2021 - 9:14'
      />
      <Message
        name='Clement Mihailescu'
        messageContent='Lorem ipsum dolar amet dolar amet Lorem ipsum dolar amet dolar amet! Lorem ipsum dolar amet dolar amet!'
        profilePic={profilePic}
        sentAt='06/25/2021 - 9:13'
      />
      <Message
        name='Clement Mihailescu'
        messageContent='Lorem!'
        profilePic={profilePic}
        sentAt='06/25/2021 - 9:14'
      />
    </div>
  );
};

export default Messages;
