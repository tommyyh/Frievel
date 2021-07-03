import React, { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';
import './profile.scss';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import ProfileInfo from './components/ProfileInfo';
import profilePic from '../../assets/img/profile_pic2.png';
import Posts from '../../components/Posts/Posts';
import Suggestions from '../../components/Suggestions/Suggestions';

const Profile = () => {
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
          <title>Clement (@clemmihai) • Frievel</title>
        </Helmet>
      </HelmetProvider>
      <Header />
      <div className='profile'>
        <main>
          <div className='profile_background'></div>
          <ProfileInfo
            profilePic={profilePic}
            name='Clement Mihailescu'
            username='@clemmihai'
            joinedAt='Joined at August 2021'
            livesIn='Lives in New York'
            bornIn='Born in 16th August 2004'
            following='20'
            followers='14 005'
          />
        </main>
        <section>
          <h2 className='profile_posts_title'>Clement's Posts</h2>
          <Posts />
        </section>
      </div>
      {desktopScreen && <Suggestions />}
    </>
  );
};

export default Profile;
