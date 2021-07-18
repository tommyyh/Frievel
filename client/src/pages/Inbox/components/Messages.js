import React from 'react';
import { v4 as uuid } from 'uuid';
import './messages.scss';
import Message from './Message';

const Messages = ({ currentlySelected, myMessages }) => {
  return (
    <div className='messages'>
      <div className='messages_title'>
        <h2>My Messages</h2>
      </div>
      {myMessages.map((myMessage) => (
        <Message
          key={uuid()}
          name={myMessage.person2_name}
          profilePic={myMessage.person2_profilePic}
          username={myMessage.person2_username}
          lastMessage={`${myMessage.message[
            myMessage.message.length - 1
          ].message.substring(0, 24)}...`}
          lastMessaged='20h'
          currentlySelected={currentlySelected}
          chat_id={myMessage.chat_id}
          seen={myMessage.seen}
        />
      ))}
    </div>
  );
};

export default Messages;
