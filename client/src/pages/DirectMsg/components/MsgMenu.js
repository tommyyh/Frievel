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

    // Increase height
    e.style.height = '';
    e.style.overflow = 'hidden';
    e.style.height = (e.scrollHeight - 3) / 16 + 'rem';
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
            <svg
              width='1.75rem'
              height='1.75rem'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z'
                fill='#6F767C'
              />
              <path
                d='M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z'
                fill='#6F767C'
              />
              <path
                d='M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14Z'
                fill='#6F767C'
              />
            </svg>
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
