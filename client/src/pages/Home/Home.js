import React from 'react';
import './home.scss';
import Header from '../../components/Header/Header';
import Post from '../../components/Posts/Post';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Post />
      </main>
    </>
  );
};

export default Home;
