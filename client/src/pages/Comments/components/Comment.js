import React from 'react';
import { Link } from 'react-router-dom';
import './comment.scss';

const Comment = ({ profilePic, username, posetedAt, content, likes }) => {
  return (
    <div className='comment'>
      <Link to={`/profile/${username}`}>
        <img src={profilePic} alt='User profile' />
      </Link>
      <div className='comment_content'>
        <div className='comment_content_top'>
          <span>
            <Link to={`/profile/${username}`}>
              <h2>{username}</h2>
            </Link>
            <h4>{posetedAt}</h4>
          </span>
        </div>
        <p>{content}</p>
        <div className='comment_icons'>
          <svg
            width='1.5rem'
            height='1.5rem'
            viewBox='0 0 25 25'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='comment_icons_like'
          >
            <path
              d='M13.4278 21.522C13.0054 21.7103 12.6974 21.7827 12.5036 21.7875H12.5H12.4505C12.2553 21.7738 11.9616 21.6988 11.5693 21.5238C11.153 21.3381 10.6703 21.06 10.1447 20.6949C9.0939 19.9649 7.91585 18.9178 6.81263 17.6629C4.58504 15.129 2.78125 11.8865 2.78125 8.83126C2.78125 6.00855 5.11952 3.58751 7.65938 3.58751C9.67282 3.58751 11.0815 4.97965 11.8873 6.11527L12.4992 6.97761L13.1108 6.11507C13.9146 4.98146 15.3232 3.58751 17.3375 3.58751C19.8794 3.58751 22.2167 6.00847 22.2167 8.8323C22.2167 11.8864 20.4127 15.1283 18.1848 17.6619C17.0815 18.9166 15.9033 19.9636 14.8524 20.6934C14.3268 21.0584 13.844 21.3364 13.4278 21.522Z'
              stroke='#6F767C'
              strokeWidth='0.09rem'
            />
          </svg>
          <h5 className='comment_likes'>{likes} likes</h5>
        </div>
      </div>
    </div>
  );
};

export default Comment;
