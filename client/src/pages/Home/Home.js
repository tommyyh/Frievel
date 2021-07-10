import React, { useState, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import './home.scss';
import Header from '../../components/Header/Header';
import Posts from '../../components/Posts/Posts';
import NewPost from './component/NewPost';
import Loading from '../../components/Loading/Loading';
import Suggestions from '../../components/Suggestions/Suggestions';
import PostForm from './component/PostForm';

const Home = () => {
  const [newPost, setNewPost] = useState(false);
  const [loading, setLoading] = useState(true);
  const desktopScreen = useMediaQuery({
    query: '(min-device-width: 1025px)',
  });
  const profilePic = useSelector((state) => state.profilePic);

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
      <div className='home'>
        <main>
          {desktopScreen && <PostForm profilePic={profilePic} />}
          <Posts />
          <div className='new_post'>
            <FaPencilAlt size='1.5rem' onClick={() => setNewPost(!newPost)} />
          </div>
          <NewPost newPost={newPost} setNewPost={setNewPost} />
        </main>
        {desktopScreen && <Suggestions />}
      </div>
    </>
  );
};

export default Home;
