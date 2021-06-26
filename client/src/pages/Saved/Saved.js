import React from 'react';
import './saved.scss';
import Posts from '../../components/Posts/Posts';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from '../../components/Header/Header';

const Saved = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Saved Posts • Frievel</title>
        </Helmet>
      </HelmetProvider>
      <Header />
      <main className='saved_posts'>
        <h1>Saved Posts</h1>
        <Posts />
      </main>
    </>
  );
};

export default Saved;
