import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './post.scss';
import { SET_POSTS } from '../../../actions/posts';

const Post = ({
  name,
  profilePic,
  userTag,
  postedAt,
  content,
  likes,
  file,
  postId,
}) => {
  const { push } = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [options, setOptions] = useState(false);
  const [isSaved, setIsSaved] = useState();
  const [isLiked, setIsLiked] = useState();
  const [imageOpen, setImageOpen] = useState(false);
  const loggedUsername = useSelector((state) => state.username);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    const checkIfSave = async () => {
      const res = await axios.post('/post/check-if-saved/', {
        id: postId,
      });

      if (res.data.status === 404) {
        setIsSaved(false);
      } else {
        setIsSaved(true);
      }
    };

    const checkIfLiked = async () => {
      const res = await axios.post('/post/check-if-liked/', {
        id: postId,
      });

      if (res.data.status === 404) {
        setIsLiked(false);
      } else {
        setIsLiked(true);
      }
    };

    checkIfSave(); // eslint-disable-next-line react-hooks/exhaustive-deps
    checkIfLiked(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const savePost = async () => {
    const res = await axios.post('/post/save-post/', {
      id: postId,
    });

    if (res.data.status === 200) {
      setOptions(false);
      setIsSaved(true);
    }
  };

  const unFollow = async () => {
    const res = await axios.post('/user/unfollow/', {
      username: userTag,
    });

    if (res.data.status === 200) {
      setOptions(false);

      if (window.location.pathname === '/') {
        const updatedPosts = posts.filter(
          (post) => post.author_username !== userTag
        );

        dispatch(SET_POSTS(updatedPosts));
      }
    }
  };

  const unSavePost = async () => {
    const res = await axios.post('/post/unsave-post/', {
      id: postId,
    });

    if (res.data.status === 200) {
      setOptions(false);
      setIsSaved(false);

      if (window.location.pathname === '/saved') {
        const updatedPosts = posts.filter((post) => post.post !== postId);

        dispatch(SET_POSTS(updatedPosts));
      }
    }
  };

  const likePost = async () => {
    await axios.post('/post/like-post/', {
      id: postId,
    });

    if (window.location.pathname === '/saved') {
      const updatedPosts = posts.map((post) =>
        post.post === postId
          ? {
              ...post,
              post_likes: post.post_likes + 1,
            }
          : post
      );

      dispatch(SET_POSTS(updatedPosts));
      setIsLiked(true);

      return;
    }

    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            post_likes: post.post_likes + 1,
          }
        : post
    );

    dispatch(SET_POSTS(updatedPosts));
    setIsLiked(true);
  };

  const unLikePost = async () => {
    await axios.post('/post/unlike-post/', {
      id: postId,
    });

    if (window.location.pathname === '/saved') {
      const updatedPosts = posts.map((post) =>
        post.post === postId
          ? {
              ...post,
              post_likes: post.post_likes - 1,
            }
          : post
      );

      dispatch(SET_POSTS(updatedPosts));
      setIsLiked(false);

      return;
    }

    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            post_likes: post.post_likes - 1,
          }
        : post
    );

    dispatch(SET_POSTS(updatedPosts));
    setIsLiked(false);
  };

  const deletePost = async () => {
    const res = await axios.post('/post/delete/', {
      id: postId,
    });

    if (res.data.status === 200) {
      if (window.location.pathname === '/saved') {
        const updatedPosts = posts.filter((post) => post.post !== postId);

        dispatch(SET_POSTS(updatedPosts));

        return;
      } else {
        const updatedPosts = posts.filter((post) => post.id !== postId);

        dispatch(SET_POSTS(updatedPosts));
      }
    }
  };

  return (
    <div
      className={window.location.pathname === '/saved' ? 'saved_post' : 'post'}
    >
      <img
        src={profilePic}
        alt='User profile'
        onClick={() => push(`/profile/${userTag}`)}
        className='post_user_img'
      />
      <div className='post_content'>
        <div className='post_content_top'>
          <Link to={`/profile/${userTag}`}>
            <h2>{name}</h2>
            <h3>@{userTag}</h3>
          </Link>
          <span className='post_content_options'>
            <svg
              width='1.5rem'
              height='1.5rem'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              onClick={() => setOptions(!options)}
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
            <div
              className='post_options_dropdown'
              style={!options ? { display: 'none' } : { display: 'initial' }}
            >
              <ul>
                {loggedUsername === userTag ? (
                  <>
                    <li onClick={deletePost}>Delete Post</li>
                    <li onClick={!isSaved ? savePost : unSavePost}>
                      {!isSaved ? 'Save Post' : 'Unsave'}
                    </li>
                  </>
                ) : (
                  <>
                    <li onClick={!isSaved ? savePost : unSavePost}>
                      {!isSaved ? 'Save Post' : 'Unsave'}
                    </li>
                    <li onClick={unFollow}>Unfollow</li>
                  </>
                )}
              </ul>
            </div>
          </span>
        </div>
        <h4>{postedAt}</h4>
        <p>{content}</p>
        {file && (
          <img
            src={file}
            alt='Post file'
            className={!imageOpen ? 'post_file' : 'post_file_open'}
            onClick={() => setImageOpen(!imageOpen)}
          />
        )}
        <div className='post_icons'>
          {loggedUsername === userTag ? (
            <svg
              width='1.5rem'
              height='1.5rem'
              viewBox='0 0 25 25'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='post_icons_like'
              style={{ cursor: 'not-allowed' }}
            >
              <path
                d='M13.4278 21.522C13.0054 21.7103 12.6974 21.7827 12.5036 21.7875H12.5H12.4505C12.2553 21.7738 11.9616 21.6988 11.5693 21.5238C11.153 21.3381 10.6703 21.06 10.1447 20.6949C9.0939 19.9649 7.91585 18.9178 6.81263 17.6629C4.58504 15.129 2.78125 11.8865 2.78125 8.83126C2.78125 6.00855 5.11952 3.58751 7.65938 3.58751C9.67282 3.58751 11.0815 4.97965 11.8873 6.11527L12.4992 6.97761L13.1108 6.11507C13.9146 4.98146 15.3232 3.58751 17.3375 3.58751C19.8794 3.58751 22.2167 6.00847 22.2167 8.8323C22.2167 11.8864 20.4127 15.1283 18.1848 17.6619C17.0815 18.9166 15.9033 19.9636 14.8524 20.6934C14.3268 21.0584 13.844 21.3364 13.4278 21.522Z'
                stroke='#6F767C'
                strokeWidth='0.09rem'
              />
            </svg>
          ) : (
            <svg
              width='1.5rem'
              height='1.5rem'
              viewBox='0 0 25 25'
              fill={isLiked ? '#cc1b50' : 'none'}
              xmlns='http://www.w3.org/2000/svg'
              className='post_icons_like'
              onClick={isLiked ? unLikePost : likePost}
            >
              <path
                d='M13.4278 21.522C13.0054 21.7103 12.6974 21.7827 12.5036 21.7875H12.5H12.4505C12.2553 21.7738 11.9616 21.6988 11.5693 21.5238C11.153 21.3381 10.6703 21.06 10.1447 20.6949C9.0939 19.9649 7.91585 18.9178 6.81263 17.6629C4.58504 15.129 2.78125 11.8865 2.78125 8.83126C2.78125 6.00855 5.11952 3.58751 7.65938 3.58751C9.67282 3.58751 11.0815 4.97965 11.8873 6.11527L12.4992 6.97761L13.1108 6.11507C13.9146 4.98146 15.3232 3.58751 17.3375 3.58751C19.8794 3.58751 22.2167 6.00847 22.2167 8.8323C22.2167 11.8864 20.4127 15.1283 18.1848 17.6619C17.0815 18.9166 15.9033 19.9636 14.8524 20.6934C14.3268 21.0584 13.844 21.3364 13.4278 21.522Z'
                stroke={isLiked ? '#cc1b50' : '#6F767C'}
                strokeWidth='0.09rem'
              />
            </svg>
          )}
          <svg
            width='1.21rem'
            height='1.21rem'
            viewBox='0 0 19 19'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='post_comment_icon'
            onClick={() => push('/post/123')}
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M18.8021 18.2479L17.6938 13.8938C18.4063 12.5875 18.8021 11.0833 18.8021 9.5C18.8021 4.35417 14.6459 0.197922 9.50002 0.197922C4.35419 0.197922 0.197937 4.35417 0.197937 9.5C0.197937 14.6458 4.35419 18.8021 9.50002 18.8021C11.0834 18.8021 12.5875 18.4063 13.8938 17.6938L18.2479 18.8021C18.5646 18.8813 18.8813 18.5646 18.8021 18.2479ZM17.6146 9.5C17.6146 11.0833 17.2188 12.2708 16.5854 13.4583C16.5063 13.6167 16.4667 13.8146 16.5063 14.0125L17.3375 17.3375L14.0521 16.5063C13.8542 16.4667 13.6563 16.4667 13.4979 16.5854C12.7854 16.9813 11.4396 17.6146 9.5396 17.6146C5.0271 17.6146 1.38544 13.9729 1.38544 9.5C1.38544 5.02709 5.0271 1.38542 9.50002 1.38542C13.9729 1.38542 17.6146 5.02709 17.6146 9.5Z'
              fill={
                window.location.pathname === `/post/${id}`
                  ? '#1E82DF'
                  : '#6F767C'
              }
            />
          </svg>
          <svg
            width='1.21rem'
            height='1.21rem'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='post_share_icon'
          >
            <g clipPath='url(#clip0)'>
              <path
                d='M19.9167 1.58333C19.7917 1.375 19.5833 1.25 19.375 1.25H0.625C0.375 1.29167 0.125 1.45833 0.0416667 1.66667C-0.0416667 1.875 0 2.16667 0.166667 2.375L6.79167 8.875L9.08333 18.2917C9.125 18.5417 9.33333 18.7083 9.58333 18.75H9.66667C9.875 18.75 10.0833 18.625 10.2083 18.4583L19.875 2.20833C20.0417 2.04167 20.0417 1.79167 19.9167 1.58333ZM2.16667 2.54167H16.9583L7.5 7.79167L2.16667 2.54167ZM9.95833 16.5417L8.125 8.875L17.6667 3.58333L9.95833 16.5417Z'
                fill='#6F767C'
              />
            </g>
            <defs>
              <clipPath id='clip0'>
                <rect width='20' height='20' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </div>
        <h5>{likes} likes</h5>
      </div>
    </div>
  );
};

export default Post;
