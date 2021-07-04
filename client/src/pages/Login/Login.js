import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import './login.scss';
import Logo from '../../components/logo/Logo';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const userInfoValues = userInfo.email && userInfo.password;

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  const onChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const signIn = async (e) => {
    e.preventDefault();

    const res = await axios.post('/user/login/', userInfo);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Login • Frievel</title>
        </Helmet>
      </HelmetProvider>
      <main className='login'>
        <div className='login_parent'>
          <div className='login_logo'>
            <Logo />
          </div>
          <div className='login_cont'>
            <div className='login_title'>
              <h1>Sign In</h1>
              {errorMsg && <p>{errorMsg}</p>}
            </div>
            <div className='login_form'>
              <form onSubmit={(e) => signIn(e)}>
                <div>
                  <input
                    type='text'
                    id='login_email'
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
                    id='login_password'
                    name='password'
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
                  Sign In
                </button>
              </form>
            </div>
            <p className='signup_link'>
              Don't have an account?
              <span>
                <Link to='/register'>Sign Up</Link>
              </span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
