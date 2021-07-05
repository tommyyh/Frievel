import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './logo.scss';
import { SIGN_IN } from '../../actions/isLogged';

const Logo = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  useEffect(() => {
    const authenticate = async () => {
      const res = await axios.get('/user/authenticate/');

      if (res.data.status === 201) {
        dispatch(SIGN_IN());
        push('/');
      }
    };

    authenticate();
  }, []);

  return (
    <div className='logo' to='/'>
      <svg
        width='43'
        height='43'
        viewBox='0 0 43 43'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='logo_icon'
      >
        <rect width='43' height='43' rx='3' fill='#1E82DF' />
        <rect x='12' y='13' width='8' height='21' rx='3' fill='#1400FF' />
        <rect x='24' y='9' width='8' height='21' rx='3' fill='white' />
      </svg>
      <h5>Frievel</h5>
    </div>
  );
};

export default Logo;
