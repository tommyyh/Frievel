import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Post from './components/Post';
import './posts.scss';
import { SET_POSTS } from '../../actions/posts';
import Loading from '../Loading/Loading';

const Posts = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
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
      const url =
        window.location.pathname === '/saved' ? '/post/saved/' : '/post/posts/';
      const res = await axios.get(url);
      const { status, posts } = res.data;

      if (status === 200) {
        dispatch(SET_POSTS(posts));
      }

      setLoading(false);
    };

    getPosts(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!loading ? (
        <div
          className={
            window.location.pathname === `/profile/${username}`
              ? 'profile_posts'
              : !posts[0]
              ? 'posts posts_none'
              : 'posts'
          }
        >
          {!loading ? (
            posts[0] ? (
              window.location.pathname === '/saved' ? (
                posts.map((post) => (
                  <Post
                    key={post.id}
                    name={post.account_name}
                    profilePic={post.account_profile_pic}
                    userTag={post.account_username}
                    postedAt={post.post_published_at}
                    content={post.post_content}
                    likes={post.post_likes}
                    file={post.post_file}
                    postId={post.id}
                    postId2={post.post}
                    setLoading={setLoading}
                  />
                ))
              ) : (
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
                    postId={post.id}
                    postId2={post.id}
                    setLoading={setLoading}
                  />
                ))
              )
            ) : (
              <h1
                style={
                  window.location.pathname === '/saved'
                    ? savedStyling
                    : homeStyling
                }
              >
                User's you follow don't have any posts yet
              </h1>
            )
          ) : (
            <Loading small={true} />
          )}
        </div>
      ) : (
        <div className='posts posts_none'>
          <Loading small={true} />
        </div>
      )}
    </>
  );
};

export default Posts;
