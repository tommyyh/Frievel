import React from 'react';
import { useParams } from 'react-router-dom';
import Post from './components/Post';
import profilePic from '../../assets/img/profile_pic.jpg';
import './posts.scss';

const Posts = () => {
  const { username } = useParams();

  return (
    <div
      className={
        window.location.pathname === `/profile/${username}`
          ? 'profile_posts'
          : 'posts'
      }
    >
      <Post
        name='Clement Mihailescu'
        profilePic={profilePic}
        userTag='clemmihai'
        posetedAt='June 19 at 10:05'
        content='The current state of our education system is being radically changed, FOR THE BETTER. The old ways are done. Students will be teaching each other faster than a college professor can prepare a lecture.'
        likes={'2,950'}
      />
      <Post
        name='Clement Mihailescu'
        profilePic={profilePic}
        userTag='clemmihai'
        posetedAt='June 19 at 10:05'
        content='The current state of our education system is being radically changed, FOR THE BETTER. The old ways are done. Students will be teaching each other faster than a college professor can prepare a lecture.'
        likes={'2,950'}
      />
      <Post
        name='Clement Mihailescu'
        profilePic={profilePic}
        userTag='clemmihai'
        posetedAt='June 19 at 10:05'
        content='The current state of our education system is being radically changed, FOR THE BETTER. The old ways are done. Students will be teaching each other faster than a college professor can prepare a lecture.'
        likes={'2,950'}
      />
    </div>
  );
};

export default Posts;
