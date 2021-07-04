import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import './register.scss';
import Logo from '../../components/logo/Logo';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

const Register = () => {
  const [loading, setLoading] = useState(true);
  const { push } = useHistory();
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    password: '',
    username: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const userInfoValues =
    userInfo.fullName &&
    userInfo.email &&
    userInfo.password &&
    userInfo.username;

  useEffect(() => {
    setLoading(false);
  }, []);

  const createUser = async (e) => {
    e.preventDefault();

    const res = await axios.post('/user/register/', userInfo);

    if (res.data.status === 201) {
      setUserInfo({
        fullName: '',
        email: '',
        password: '',
        username: '',
      });

      push('/login');
    } else {
      setErrorMsg(res.data.message);
    }
  };

  const onChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  if (loading) return <Loading />;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Register • Frievel</title>
        </Helmet>
      </HelmetProvider>
      <main className='register'>
        <div className='register_parent'>
          <div className='register_logo'>
            <Logo />
          </div>
          <div className='register_cont'>
            <div className='register_title'>
              <h1>Sign Up</h1>
              {errorMsg && <p>{errorMsg}</p>}
            </div>
            <div className='register_form'>
              <form onSubmit={(e) => createUser(e)}>
                <div>
                  <input
                    type='text'
                    id='register_name'
                    name='fullName'
                    placeholder='Full name'
                    onChange={(e) => {
                      onChange(e);
                      setErrorMsg('');
                    }}
                    value={userInfo.fullName}
                  />
                </div>
                <div>
                  <input
                    type='text'
                    id='register_username'
                    name='username'
                    placeholder='Username'
                    onChange={(e) => {
                      onChange(e);
                      setErrorMsg('');
                    }}
                    value={userInfo.username}
                  />
                </div>
                <div>
                  <input
                    type='text'
                    id='register_email'
                    name='email'
                    placeholder='Email Address'
                    onChange={(e) => {
                      onChange(e);
                      setErrorMsg('');
                    }}
                    value={userInfo.email}
                  />
                </div>
                <div>
                  <input
                    type='password'
                    name='password'
                    id='register_password'
                    placeholder='Password'
                    onChange={(e) => {
                      onChange(e);
                      setErrorMsg('');
                    }}
                    value={userInfo.password}
                  />
                </div>
                <button
                  type='submit'
                  disabled={!userInfoValues ? true : false}
                  style={
                    !userInfoValues
                      ? { cursor: 'not-allowed' }
                      : { border: 'none' }
                  }
                >
                  Sign Up
                </button>
              </form>
            </div>
            <p className='sign_in_redirect'>
              Already have an account?{' '}
              <span>
                <Link to='/login'>Sign in</Link>
              </span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
