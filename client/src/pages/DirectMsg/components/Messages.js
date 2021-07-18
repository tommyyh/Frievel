import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import './messages.scss';
import Message from './Message';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { SET_UNREAD } from '../../../actions/unread';

const Messages = ({ user, ammount }) => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const desktopScreen = useMediaQuery({
    query: '(min-device-width: 1025px)',
  });
  const messages = useSelector((state) => state.msg);

  useEffect(() => {
    const seen = async () => {
      const res = await axios.get(`/room/seen/${id}`);

      dispatch(SET_UNREAD(res.data.unread));
    };

    seen(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {desktopScreen && (
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
      )}
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
