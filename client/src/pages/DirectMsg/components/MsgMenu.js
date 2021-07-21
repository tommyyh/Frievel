import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './msgMenu.scss';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MsgMenu = ({ messagesRef }) => {
  const [messageContent, setMessageContent] = useState('');
  const textareaRef = useRef();
  const buttonRef = useRef();
  const socket = useSelector((state) => state.socket);
  const username = useSelector((state) => state.username);
  const name = useSelector((state) => state.name);
  const profilePic = useSelector((state) => state.profilePic);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const { push } = useHistory();

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/room/get-user/${id}`);

      if (res.data.status === 401) {
        return push('/inbox');
      } else {
        setUser(res.data.direct_msg);
      }
    };

    getUser(); // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => {
      setMessageContent(null);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Scale the input size according to the text size
  const inputResize = (e) => {
    // Always end at the bottom of the element
    e.scrollTop = e.scrollHeight - e.clientHeight;

    // If height > 176 - add scrollbar instead of increasing the height
    if (e.scrollHeight > 132) {
      e.style.height = '';
      e.style.height = 132 / 16 + 'rem';
      e.style.overflow = 'initial';

      return;
    }

    const rootFontSize = window
      .getComputedStyle(document.body)
      .getPropertyValue('font-size');

    // Increase height
    e.style.height = '';
    e.style.overflow = 'hidden';
    e.style.height = (e.scrollHeight - 3) / rootFontSize + 'rem';
  };

  const sendMessage = (messageContent) => {
    if (socket.readyState === 1) {
      socket.send(
        JSON.stringify({
          message: messageContent,
          username: username,
          name: name,
          profilePic: profilePic,
          sentAt: new Date(),
          room_id: id,
        })
      );

      textareaRef.current.style.height = '2.6rem';
      setMessageContent('');
    }
  };

  return (
    <>
      <header>
        <nav className='msg_menu'>
          <div className='msg_menu_top'>
            <span>
              <Link to='/inbox'>
                <svg
                  aria-label='Back'
                  fill='#1e82df'
                  viewBox='0 0 48 48'
                  height='1.6rem'
                  width='1.6rem'
                >
                  <path d='M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z' />
                </svg>
              </Link>
              <img src={user.person2_profilePic} alt='User profile' />
              <div className='message_receiver'>
                <h1>{user.person2_name}</h1>
                <h3>@{user.person2_username}</h3>
              </div>
            </span>
          </div>
        </nav>
      </header>
      <section>
        <div className='msg_menu_bottom_background'></div>
        <textarea
          type='text'
          name='msg_menu_input'
          placeholder='Your message...'
          id='msg_menu_input'
          onChange={(e) => {
            inputResize(e.target);
            setMessageContent(e.target.value);
          }}
          value={messageContent}
          ref={textareaRef}
          maxLength='300'
          onKeyUp={(e) => {
            if (e.key !== 'Enter') return;

            buttonRef.current.click();
          }}
        ></textarea>
        <button
          className={
            !messageContent
              ? 'message_send message_send_hidden'
              : 'message_send'
          }
          ref={buttonRef}
          onClick={() => {
            sendMessage(messageContent);
          }}
          disabled={!messageContent ? true : false}
        >
          Send
        </button>
      </section>
    </>
  );
};

export default MsgMenu;
