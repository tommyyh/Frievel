import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Post from './components/Post';
import './posts.scss';
import { SET_POSTS } from '../../actions/posts';

const Posts = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const mobileScreen = useMediaQuery({ query: '(max-device-width: 480px)' });
  const posts = useSelector((state) => state.posts);
  const savedStyling = !mobileScreen
    ? {
        fontSize: '0.9rem',
        fontWeight: '200',
        color: '#c7c7c7',
        marginTop: '3.5rem',
      }
    : {
        fontSize: '1rem',
        fontWeight: '400',
        color: '#c7c7c7',
        marginTop: '2.65rem',
      };
  const homeStyling = !mobileScreen
    ? {
        fontSize: '0.9rem',
        fontWeight: '200',
        color: '#c7c7c7',
        marginTop: '0.3rem',
      }
    : {
        fontSize: '1.1rem',
        fontWeight: '400',
        color: '#c7c7c7',
        marginTop: '2rem',
        marginLeft: '7%',
      };

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get('/post/posts/');
      const { status, posts } = res.data;

      if (status === 200) {
        dispatch(SET_POSTS(posts));
      }
    };

    getPosts(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={
        window.location.pathname === `/profile/${username}`
          ? 'profile_posts'
          : !posts[0]
          ? 'posts posts_none'
          : 'posts'
      }
    >
      {posts[0] ? (
        posts.map((post) => (
          <Post
            key={post.id}
            name={post.author_name}
            profilePic={post.author_profile_pic}
            userTag={post.author_username}
            posetedAt={post.published_at}
            content={post.content}
            likes={post.likes}
            file={post.file}
          />
        ))
      ) : (
        <h1
          style={
            window.location.pathname === '/saved' ? savedStyling : homeStyling
          }
        >
          User's you follow don't have any posts yet
        </h1>
      )}
    </div>
  );
};

export default Posts;
