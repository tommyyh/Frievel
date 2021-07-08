import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import './profile.scss';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import ProfileInfo from './components/ProfileInfo';
import defaultPic from '../../assets/img/default_profile.jpg';
import Post from '../../components/Posts/components/Post';
import Suggestions from '../../components/Suggestions/Suggestions';
import NotFound from '../NotFound/NotFound';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const { username } = useParams();
  const desktopScreen = useMediaQuery({
    query: '(min-device-width: 1025px)',
  });

  useEffect(() => {
    const getProfileInfo = async () => {
      const res = await axios.get(`/user/profile/${username}`);

      if (res.data.status === 200) {
        setPosts(res.data.profilePosts);
        setProfile(res.data.profile);
      }
    };

    getProfileInfo();
    setLoading(false);
  }, [username]);

  if (loading) return <Loading />;

  return (
    <>
      {!profile.name ? (
        <NotFound />
      ) : (
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
                profilePic={
                  !profile.profilePic ? defaultPic : profile.profilePic
                }
                name={profile.name}
                userTag={`@${profile.username}`}
                joinedAt={`Joined at ${profile.date_joined}`}
                livesIn={`Lives in ${
                  !profile.lives_in ? '-' : profile.lives_in
                }`}
                bornIn={`Born in ${
                  !profile.born_in ? '-' : profile.born_in.split('T')[0]
                }`}
                following={profile.following_count}
                followers={profile.follower_count}
              />
            </main>
            <section>
              <h2 className='profile_posts_title'>{profile.name}'s Posts</h2>
              {!posts[0] ? (
                <h4 className='profile_no_posts'>
                  This user has not posts yet
                </h4>
              ) : (
                posts.map((post) => (
                  <Post
                    key={post.id}
                    name={post.author_name}
                    profilePic={
                      !post.author_profile_pic
                        ? defaultPic
                        : post.author_profile_pic
                    }
                    userTag={post.author_username}
                    posetedAt={post.published_at}
                    content={post.content}
                    likes={post.likes}
                  />
                ))
              )}
            </section>
          </div>
          {desktopScreen && <Suggestions />}
        </>
      )}
    </>
  );
};

export default Profile;
