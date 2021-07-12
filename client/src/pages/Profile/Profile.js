import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
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
import { SET_PROFILE_PIC } from '../../actions/user';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState({
    profilePicture: '',
    livesIn: '',
    bornIn: '',
  });
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({});
  const [updateOpen, setUpdateOpen] = useState(false);
  const [inputType, setInputType] = useState('text');
  const [processing, setProcessing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [preview, setPreview] = useState();
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
        setBio({
          ...bio,
          livesIn: res.data.profile.lives_in,
          bornIn: res.data.profile.born_in,
        });
      }

      setLoading(false);
    };

    getProfileInfo(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  // Show preview of an image when the image state changes
  useEffect(() => {
    const image = bio.profilePicture;

    if (image) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [bio.profilePicture]);

  if (!updateOpen) {
    document.body.style.overflowY = 'initial';
  } else {
    document.body.style.overflowY = 'hidden';
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  const onChange = (e) => {
    setBio({ ...bio, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    setProcessing(true);
    const data = new FormData();

    // Convert Base64 to file -> send to server as default pic after registering
    const dataURLtoFile = (dataurl, filename) => {
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    };

    const file = dataURLtoFile(defaultPic, 'default_profile.jpg');
    const profilePic = !bio.profilePicture ? file : bio.profilePicture;

    data.append('profileImg', profilePic);
    data.append('livesIn', bio.livesIn);
    data.append('bornIn', bio.bornIn);

    const res = await axios.post(`/user/update/${username}/`, data);
    const { status, profile } = res.data;

    if (status === 200) {
      setProfile({
        ...profile,
        born_in: profile.born_in,
        lives_in: profile.lives_in,
        profilePic: profile.profilePic,
      });

      setPosts(
        posts.map((post) =>
          true
            ? { ...post, profilePic: profile.profilePic }
            : { ...post, profilePic: profile.profilePic }
        )
      );

      setBio({
        profilePicture: '',
        livesIn: '',
        bornIn: '',
      });

      dispatch(SET_PROFILE_PIC(profile.profilePic));
      setProcessing(false);
      setUpdateOpen(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      {!profile.name ? (
        <NotFound />
      ) : (
        <>
          <HelmetProvider>
            <Helmet>
              <title>
                {profile.name} {`(${profile.username})`} • Frievel
              </title>
            </Helmet>
          </HelmetProvider>
          <Header />
          <div className='profile'>
            <main>
              <div className='profile_background'></div>
              <ProfileInfo
                profilePic={profile.profilePic}
                name={profile.name}
                userTag={`@${profile.username}`}
                joinedAt={`Joined at ${profile.date_joined.split('T')[0]}`}
                livesIn={`Lives in ${
                  !profile.lives_in ? '-' : profile.lives_in
                }`}
                bornIn={`Born in ${!profile.born_in ? '-' : profile.born_in}`}
                following={profile.following_count}
                followers={profile.follower_count}
                setUpdateOpen={setUpdateOpen}
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
                    profilePic={post.author_profile_pic}
                    userTag={post.author_username}
                    posetedAt={post.published_at}
                    content={post.content}
                    likes={post.likes}
                    postId={post.id}
                    postId2={post.id}
                  />
                ))
              )}
            </section>
          </div>
          <section
            className={
              updateOpen
                ? 'setup_background'
                : 'setup_background setup_background_hidden'
            }
          >
            <span>
              <div>
                <div
                  style={{
                    position: 'relative',
                    width: '12rem',
                    height: '12rem',
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src={!preview ? defaultPic : preview}
                      alt='User profile'
                    />
                    <input
                      type='file'
                      accept='image/*'
                      id='profile_picture'
                      name='profilePicture'
                      onChange={(e) => {
                        const file = e.target.files[0];

                        if (file && file.type.substr(0, 5) === 'image') {
                          setBio({ ...bio, profilePicture: file });
                        } else {
                          setBio({ ...bio, profilePicture: null });
                        }
                      }}
                    />
                  </div>
                  {!preview ? (
                    <div
                      className='update_photo_plus'
                      style={{ borderRadius: '50%' }}
                    >
                      <FaTimes size='2rem' />
                    </div>
                  ) : (
                    <div
                      className='update_photo_plus'
                      style={{ display: 'none' }}
                    >
                      <FaTimes size='2rem' />
                    </div>
                  )}
                </div>
                <input
                  type='text'
                  name='livesIn'
                  id='lives_in'
                  placeholder='Current City'
                  onChange={(e) => onChange(e)}
                  value={bio.livesIn}
                />
                <input
                  type={inputType}
                  onFocus={() => setInputType('date')}
                  name='bornIn'
                  placeholder='Born in'
                  id='born_in'
                  onChange={(e) => onChange(e)}
                  value={bio.bornIn}
                />
                <button
                  onClick={updateProfile}
                  disabled={!processing ? false : true}
                >
                  {!processing ? 'Update' : 'Processing...'}
                </button>
              </div>
              <h4 onClick={() => setUpdateOpen(false)}>Skip for now</h4>
            </span>
          </section>
          {desktopScreen && <Suggestions />}
        </>
      )}
    </>
  );
};

export default Profile;
