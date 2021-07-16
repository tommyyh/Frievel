import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './profileMenu.scss';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  SET_NAME,
  SET_EMAIL,
  SET_USERNAME,
  SET_PROFILE_PIC,
} from '../../../actions/user';
import { LOGOUT } from '../../../actions/isLogged';

const ProfileMenu = ({ setProfileMenu }) => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const username = useSelector((state) => state.username);

  const logout = async () => {
    const res = await axios.delete('http://localhost:5000/user/logout/');

    if (res.data.status === 200) {
      dispatch(LOGOUT());
      dispatch(SET_EMAIL(''));
      dispatch(SET_USERNAME(''));
      dispatch(SET_PROFILE_PIC(''));
      dispatch(SET_NAME(''));

      push('/login');
    }
  };

  return (
    <div className='profile_menu'>
      <ul>
        <Link to={`/profile/${username}`} onClick={() => setProfileMenu(false)}>
          <li>Profile</li>
        </Link>
        <Link to='/saved' onClick={() => setProfileMenu(false)}>
          <li>Saved</li>
        </Link>
        <li
          className='menu_logout'
          onClick={() => {
            setProfileMenu(false);
            logout();
          }}
        >
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
