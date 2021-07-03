import React, { useState, useEffect, useRef } from 'react';
import './comments.scss';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Loading from '../../components/Loading/Loading';
import Header from '../../components/Header/Header';
import Post from '../../components/Posts/components/Post';
import profilePic from '../../assets/img/profile_pic.jpg';
import Comment from './components/Comment';

const Comments = () => {
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const textareaRef = useRef();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  // Scale the input size according to the text size
  const inputResize = (e) => {
    // Always end at the bottom of the element
    e.scrollTop = e.scrollHeight - e.clientHeight;

    // If height > 176 - add scrollbar instead of increasing the height
    if (e.scrollHeight > 149) {
      e.style.height = '';
      e.style.height = '11rem';
      e.style.overflow = 'initial';

      return;
    }

    if (window.innerWidth > 1025 && e.scrollHeight < 49) {
      e.style.height = '';
      e.style.height = '2.6rem';

      return;
    }

    // Increase height
    e.style.height = '';
    e.style.overflow = 'hidden';
    e.style.height = e.scrollHeight / 16 + 'rem';
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Clement Mihailescu's posts • Frievel</title>
        </Helmet>
      </HelmetProvider>
      <Header />
      <main>
        <Post
          name='Clement Mihailescu'
          profilePic={profilePic}
          userTag='clemmihai'
          posetedAt='June 19 at 10:05'
          content='The current state of our education system is being radically changed, FOR THE BETTER. The old ways are done. Students will be teaching each other faster than a college professor can prepare a lecture.'
          likes={'2,950'}
        />
      </main>
      <section className='post_comments'>
        <h1>Comments</h1>
        <textarea
          type='text'
          name='msg_menu_input'
          placeholder='Write a comment...'
          id='comment_input'
          onChange={(e) => {
            inputResize(e.target);
            setCommentContent(e.target.value);
          }}
          value={commentContent}
          ref={textareaRef}
        ></textarea>
        <button
          className={
            !commentContent
              ? 'send_comment send_comment_hidden'
              : 'send_comment'
          }
          disabled={!commentContent ? true : false}
        >
          Send
        </button>
        <Comment
          name='Clement Mihailescu'
          profilePic={profilePic}
          username='clemmihai'
          posetedAt='June 19 at 10:05'
          content='The current state of our education system is being radically changed, FOR THE BETTER. The old ways are done. Students will be teaching each other faster than a college professor can prepare a lecture.'
          likes='2,950'
        />
        <Comment
          name='Clement Mihailescu'
          profilePic={profilePic}
          username='clemmihai'
          posetedAt='June 19 at 10:05'
          content='The current state of our education system is being radically changed, FOR THE BETTER. The old ways are done. Students will be teaching each other faster than a college professor can prepare a lecture.'
          likes='2,950'
        />
      </section>
    </>
  );
};

export default Comments;
