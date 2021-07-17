import React, { useState, useRef } from 'react';
import './msgMenu.scss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import defaultPic from '../../../assets/img/default_profile.jpg';

const MsgMenu = () => {
  const [messageContent, setMessageContent] = useState('');
  const textareaRef = useRef();
  const socket = useSelector((state) => state.socket);
  const username = useSelector((state) => state.username);
  const name = useSelector((state) => state.name);
  const profilePic = useSelector((state) => state.profilePic);
  const { id } = useParams();

  // Scale the input size according to the text size
  const inputResize = (e) => {
    // Always end at the bottom of the element
    e.scrollTop = e.scrollHeight - e.clientHeight;

    // If height > 176 - add scrollbar instead of increasing the height
    if (e.scrollHeight > 176) {
      e.style.height = '';
      e.style.height = '11rem';
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
              <img src={defaultPic} alt='User profile' />
              <div className='message_receiver'>
                <h1>Clement Mihailescu</h1>
                <h3>@clemmihai</h3>
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
        ></textarea>
        <div className='msg_menu_file'>
          <svg
            width='1.85rem'
            height='1.85rem'
            viewBox='0 0 31 31'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M25.5104 2.58334H5.48959C3.88793 2.58334 2.58334 3.88793 2.58334 5.48959V25.5104C2.58334 27.1121 3.88793 28.4167 5.48959 28.4167H25.5104C27.1121 28.4167 28.4167 27.1121 28.4167 25.5104V5.48959C28.4167 3.88793 27.1121 2.58334 25.5104 2.58334ZM5.48959 4.52084H25.5104C26.0439 4.52084 26.4792 4.95614 26.4792 5.48959V17.9878L21.4959 13.0045C21.3144 12.8228 21.0682 12.7206 20.8113 12.7203H20.8075C20.6794 12.7201 20.5526 12.7455 20.4345 12.7952C20.3165 12.8449 20.2096 12.9179 20.1203 13.0097L14.5442 18.6723L12.2024 16.3396C12.0209 16.1579 11.7746 16.0557 11.5178 16.0554C11.2685 16.0167 11.0076 16.1588 10.8268 16.3486L4.52084 22.7876V5.48959C4.52084 4.95614 4.95614 4.52084 5.48959 4.52084ZM4.52859 25.5492L11.5268 18.4011L19.6411 26.4792H5.48959C5.24058 26.4774 5.00182 26.3798 4.82288 26.2066C4.64394 26.0334 4.53855 25.798 4.52859 25.5492ZM25.5104 26.4792H22.3846L15.9172 20.0376L20.8152 15.0647L26.4792 20.7274V25.5104C26.4792 26.0439 26.0439 26.4792 25.5104 26.4792Z'
              fill='#A1A4A8'
            />
            <path
              d='M11.4545 12.7242C12.5545 12.7242 13.4462 11.8325 13.4462 10.7325C13.4462 9.63246 12.5545 8.74072 11.4545 8.74072C10.3545 8.74072 9.46274 9.63246 9.46274 10.7325C9.46274 11.8325 10.3545 12.7242 11.4545 12.7242Z'
              fill='#A1A4A8'
            />
          </svg>
          <input
            type='file'
            alt='File input'
            id='msg_menu_file_input'
            accept='image/*'
          />
          <button
            className={
              !messageContent
                ? 'message_send message_send_hidden'
                : 'message_send'
            }
            onClick={() => {
              sendMessage(messageContent);
            }}
          >
            Send
          </button>
        </div>
      </section>
    </>
  );
};

export default MsgMenu;
