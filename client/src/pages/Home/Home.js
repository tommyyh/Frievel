import React, { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import './home.scss';
import Header from '../../components/Header/Header';
import Posts from '../../components/Posts/Posts';
import NewPost from './component/NewPost';
import Loading from '../../components/Loading/Loading';

const Home = () => {
  const [newPost, setNewPost] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (newPost) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'initial';
  }

  if (loading) return <Loading />;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Home • Frievel</title>
        </Helmet>
      </HelmetProvider>
      <Header />
      <main>
        <Posts />
        <div className='new_post'>
          <FaPencilAlt size='1.5rem' onClick={() => setNewPost(!newPost)} />
        </div>
        <NewPost newPost={newPost} setNewPost={setNewPost} />
      </main>
    </>
  );
};

export default Home;
