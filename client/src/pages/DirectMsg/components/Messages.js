import React from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import './messages.scss';
import Message from './Message';

const Messages = ({ messages, user }) => {
  const { push } = useHistory();

  return (
    <>
      <div
        className='inbox_scroll_right'
        style={{ cursor: 'pointer' }}
        onClick={() => push(`/profile/${user.person2_username}`)}
      >
        <img src={user.person2_profilePic} alt='User profile' />
        <span>
          <h1>{user.person2_name}</h1>
          <p>@{user.person2_username}</p>
        </span>
      </div>
      <main className='direct_messages'>
        {messages.map((message) => (
          <Message
            key={uuid()}
            name={message.name}
            messageContent={message.message}
            profilePic={message.profilePic}
            sentAt={message.sentAt}
          />
        ))}
      </main>
    </>
  );
};

export default Messages;
