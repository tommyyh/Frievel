import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './comments.scss';
import axios from 'axios';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';
import Loading from '../../components/Loading/Loading';
import Header from '../../components/Header/Header';
import Post from '../../components/Posts/components/Post';
import Comment from './components/Comment';
import Suggestions from '../../components/Suggestions/Suggestions';
import NotFound from '../NotFound/NotFound';

const Comments = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const [commentContent, setCommentContent] = useState('');
  const { id } = useParams();
  const textareaRef = useRef();
  const desktopScreen = useMediaQuery({
    query: '(min-device-width: 1025px)',
  });

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`/post/info/${id}/`);

      if (res.data.status === 404) {
        setLoading(false);
      } else {
        setPost(res.data.post);
        setLoading(false);
      }
    };

    getData();
  }, [id]);

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

    const rootFontSize = window
      .getComputedStyle(document.body)
      .getPropertyValue('font-size');

    // Increase height
    e.style.height = '';
    e.style.overflow = 'hidden';
    e.style.height = e.scrollHeight / rootFontSize + 'rem';
  };

  const newComment = async () => {
    const res = await axios.post('/post/new-comment/', {
      content: commentContent,
      id: id,
    });

    if (res.data.status === 200) {
      setPost({ ...post, post_comments: res.data.all_comments });
    }
  };

  return (
    <>
      {!post.author_name ? (
        <NotFound />
      ) : (
        <>
          <HelmetProvider>
            <Helmet>
              <title>{post.author_name}'s posts • Frievel</title>
            </Helmet>
          </HelmetProvider>
          <Header />
          <div className='comment_page'>
            <main>
              <Post
                key={post.id}
                name={post.author_name}
                profilePic={post.author_profile_pic}
                userTag={post.author_username}
                postedAt={post.published_at}
                content={post.content}
                likes={post.post_likes}
                file={post.file}
                postId={post.id}
                setPost={setPost}
                post={post}
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
                onClick={newComment}
                disabled={!commentContent ? true : false}
              >
                Send
              </button>
              {post.post_comments.map((comment) => (
                <Comment
                  key={comment.id}
                  name={comment.author_name}
                  profilePic={comment.author_profile_pic}
                  username={comment.author_username}
                  posetedAt={comment.posted_at}
                  content={comment.content}
                  likes={comment.comment_likes}
                  id={comment.id}
                  post={post}
                  setPost={setPost}
                />
              ))}
            </section>
          </div>
          {desktopScreen && <Suggestions />}
        </>
      )}
    </>
  );
};

export default Comments;
