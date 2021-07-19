import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FaCommentDots } from 'react-icons/fa';
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
  setUpdateOpen,
  hasChat,
}) => {
  const { username } = useParams();
  const { push } = useHistory();
  const [followed, setFollowed] = useState(false);
  const [followedHover, setFollowedHover] = useState(false);
  const loggedUserUsername = useSelector((state) => state.username);

  useEffect(() => {
    const checkIfFollowing = async () => {
      const res = await axios.get(`/user/following/${username}/`);

      if (res.data.account_followed === 'true') {
        setFollowed(true);
      } else {
        setFollowed(false);
      }
    };

    checkIfFollowing();

    return () => {
      setFollowed(null);
      setFollowedHover(null);
    };
  }, [username]);

  const follow = async () => {
    const res = await axios.post('/user/follow/', {
      username,
    });

    if (res.data.status === 200) {
      setFollowed(true);
    }
  };

  const unfollow = async () => {
    const res = await axios.post('/user/unfollow/', {
      username,
    });

    if (res.data.status === 200) {
      setFollowed(false);
    }
  };

  const messageUser = async () => {
    const res = await axios.get(`/room/message-user/${username}`);

    push(`/inbox/${res.data.direct_message.chat_id}`);
  };

  return (
    <div className='profile_info'>
      <img src={profilePic} alt='User profile' />
      {username !== loggedUserUsername ? (
        !followed ? (
          <>
            <button
              className='message_button'
              onClick={
                hasChat.hasChat
                  ? () => push(`/inbox/${hasChat.chat_id}`)
                  : messageUser
              }
            >
              <FaCommentDots size='1.18rem' />
            </button>
            <button
              className={!followed ? 'follow_btn' : 'follow_btn following_btn'}
              onClick={follow}
            >
              Follow
            </button>
          </>
        ) : (
          <>
            <button className='message_button'>
              <FaCommentDots size='1.18rem' />
            </button>
            <button
              className={!followed ? 'follow_btn' : 'follow_btn following_btn'}
              onClick={unfollow}
              onMouseLeave={() => setFollowedHover(false)}
              onMouseEnter={() => setFollowedHover(true)}
            >
              {!followedHover ? 'Following' : 'Unfollow'}
            </button>
          </>
        )
      ) : (
        <button className='bio_btn' onClick={() => setUpdateOpen(true)}>
          Add Bio
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
