import React, { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';
import './saved.scss';
import Posts from '../../components/Posts/Posts';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import Suggestions from '../../components/Suggestions/Suggestions';

const Saved = () => {
  const [loading, setLoading] = useState(true);
  const desktopScreen = useMediaQuery({
    query: '(min-device-width: 1025px)',
  });

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
      <div className='saved'>
        <main className='saved_posts'>
          <h1>Saved Posts</h1>
          <Posts />
        </main>
        {desktopScreen && <Suggestions />}
      </div>
    </>
  );
};

export default Saved;
