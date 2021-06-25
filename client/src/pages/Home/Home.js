import React from 'react';
import './home.scss';
import Header from '../../components/Header/Header';
import Posts from '../../components/Posts/Posts';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Posts />
      </main>
    </>
  );
};

export default Home;
