import React from 'react';
import './profileMenu.scss';
import { Link } from 'react-router-dom';

const ProfileMenu = ({ setProfileMenu }) => {
  return (
    <div className='profile_menu'>
      <ul>
        <Link to='/profile/clemmihai' onClick={() => setProfileMenu(false)}>
          <li>Profile</li>
        </Link>
        <Link to='/saved' onClick={() => setProfileMenu(false)}>
          <li>Saved</li>
        </Link>
        <li className='menu_logout' onClick={() => setProfileMenu(false)}>
          Logout
        </li>
      </ul>
      <svg
        stroke='currentColor'
        fill='#2f3031'
        strokeWidth='0'
        viewBox='0 0 320 512'
        height='2.3rem'
        width='2.3rem'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z'
          stroke='none'
        />
      </svg>
    </div>
  );
};

export default ProfileMenu;
