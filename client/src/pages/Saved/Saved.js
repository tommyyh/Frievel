import React, { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import './saved.scss';
import Posts from '../../components/Posts/Posts';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';

const Saved = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

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
