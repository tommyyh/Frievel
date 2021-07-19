import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './messages.scss';
import Message from './Message';
import Loading from '../../../components/Loading/Loading';

const Messages = ({ currentlySelected }) => {
  const [loading, setLoading] = useState(true);
  const [myMessages, setMyMessages] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await axios.get('/user/my-messages/');

      setMyMessages(res.data.messages);
      setLoading(false);
    })();

    return () => {
      setLoading(null);
      setMyMessages(null);
    };
  }, []);

  return (
    <div className='messages'>
      <div className='messages_title'>
        <h2>My Messages</h2>
      </div>
      {loading ? (
        <Loading small={true} />
      ) : (
        myMessages &&
        myMessages.map((myMessage) => (
          <Message
            key={myMessage.id}
            name={myMessage.person2_name}
            profilePic={myMessage.person2_profilePic}
            username={myMessage.person2_username}
            lastMessage={
              !myMessage.message[0]
                ? 'Start a conversation'
                : `${myMessage.message[
                    myMessage.message.length - 1
                  ].message.substring(0, 24)}...`
            }
            lastMessaged='20h'
            currentlySelected={currentlySelected}
            chat_id={myMessage.chat_id}
            seen={myMessage.seen}
          />
        ))
      )}
    </div>
  );
};

export default Messages;
