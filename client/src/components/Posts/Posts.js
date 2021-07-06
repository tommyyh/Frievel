import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Post from './components/Post';
import profilePic from '../../assets/img/profile_pic.jpg';
import './posts.scss';

const Posts = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get('/post/posts/');
      const { status, posts } = res.data;

      if (status === 200) {
        setPosts(posts);
      }
    };

    getPosts();
  }, []);

  return (
    <div
      className={
        window.location.pathname === `/profile/${username}`
          ? 'profile_posts'
          : 'posts'
      }
    >
      {posts.map((post) => (
        <Post
          key={post.id}
          name={post.author_name}
          profilePic={profilePic}
          userTag={post.author_username}
          posetedAt={post.published_at}
          content={post.content}
          likes={post.likes}
        />
      ))}
    </div>
  );
};

export default Posts;
