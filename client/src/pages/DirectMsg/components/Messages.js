import React from 'react';
import './messages.scss';
import Message from './Message';
import defaultPic from '../../../assets/img/default_profile.jpg';

const Messages = () => {
  return (
    <main className='direct_messages'>
      <Message
        name='Clement Mihailescu'
        messageContent='Lorem ipsum dolar amet!'
        profilePic={defaultPic}
        sentAt='06/25/2021 - 9:11'
      />
      <Message
        name='Clement Mihailescu'
        messageContent='Lorem ipsum dolar amet dolar amet Lorem ipsum dolar amet dolar amet! Lorem ipsum dolar amet dolar amet!'
        profilePic={defaultPic}
        sentAt='06/25/2021 - 9:13'
      />
      <Message
        name='Clement Mihailescu'
        messageContent='Lorem!'
        profilePic={defaultPic}
        sentAt='06/25/2021 - 9:14'
      />
      <Message
        name='Clement Mihailescu'
        messageContent='Lorem ipsum dolar amet!'
        profilePic={defaultPic}
        sentAt='06/25/2021 - 9:11'
      />
      <Message
        name='Clement Mihailescu'
        messageContent='Lorem ipsum dolar amet dolar amet Lorem ipsum dolar amet dolar amet! Lorem ipsum dolar amet dolar amet!'
        profilePic={defaultPic}
        sentAt='06/25/2021 - 9:13'
      />
      <Message
        name='Clement Mihailescu'
        messageContent='Lorem!'
        profilePic={defaultPic}
        sentAt='06/25/2021 - 9:14'
      />
      <Message
        name='Clement Mihailescu'
        messageContent='Lorem ipsum dolar amet dolar amet Lorem ipsum dolar amet dolar amet! Lorem ipsum dolar amet dolar amet!'
        profilePic={defaultPic}
        sentAt='06/25/2021 - 9:13'
      />
      <Message
        name='Clement Mihailescu'
        messageContent='Lorem!'
        profilePic={defaultPic}
        sentAt='06/25/2021 - 9:14'
      />
    </main>
  );
};

export default Messages;
