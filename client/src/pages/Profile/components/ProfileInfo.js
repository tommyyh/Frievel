import React from 'react';
import './profileInfo.scss';

const ProfileInfo = ({
  profilePic,
  name,
  username,
  joinedAt,
  livesIn,
  bornIn,
  following,
  followers,
}) => {
  return (
    <div className='profile_info'>
      <img src={profilePic} alt='User profile' />
      <h1>{name}</h1>
      <h2>{username}</h2>
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
