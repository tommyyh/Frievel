import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './profileInfo.scss';

const ProfileInfo = ({
  profilePic,
  name,
  userTag,
  joinedAt,
  livesIn,
  bornIn,
  following,
  followers,
}) => {
  const { username } = useParams();
  const loggedUserUsername = useSelector((state) => state.username);

  const follow = async () => {
    const res = await axios.post('/user/follow/', {
      username,
    });
  };

  return (
    <div className='profile_info'>
      <img src={profilePic} alt='User profile' />
      {username != loggedUserUsername && (
        <button className='follow_btn' onClick={follow}>
          Follow
        </button>
      )}
      <h1>{name}</h1>
      <h2>{userTag}</h2>
      <div className='profile_info_geo'>
        <h4>{joinedAt}</h4>
        <h4>{livesIn}</h4>
        <h4>{bornIn}</h4>
      </div>
      <div className='profile_info_stats'>
        <h4>
          <span>{following}</span> Following
        </h4>
        <h4>
          <span>{followers}</span> Followers
        </h4>
      </div>
    </div>
  );
};

export default ProfileInfo;
