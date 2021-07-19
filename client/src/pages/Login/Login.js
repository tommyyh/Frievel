import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import './login.scss';
import Logo from '../../components/logo/Logo';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { SIGN_IN } from '../../actions/isLogged';
import {
  SET_NAME,
  SET_EMAIL,
  SET_USERNAME,
  SET_PROFILE_PIC,
} from '../../actions/user';

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const userInfoValues = userInfo.email && userInfo.password;
  const dispatch = useDispatch();
  const { push } = useHistory();

  useEffect(() => {
    setLoading(false);

    return () => {
      setProgress(null);
      setErrorMsg(null);
      setUserInfo(null);
      setLoading(null);
    };
  }, []);

  if (loading) return <Loading />;

  const onChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const signIn = async (e) => {
    e.preventDefault();
    setProgress(true);

    const res = await axios.post('/user/login/', userInfo);
    const { name, username, email, profile_pic } = res.data;

    if (res.data.status === 201) {
      dispatch(SIGN_IN());
      dispatch(SET_NAME(name));
      dispatch(SET_USERNAME(username));
      dispatch(SET_EMAIL(email));
      dispatch(SET_PROFILE_PIC(profile_pic));
      setProgress(false);

      return push('/');
    } else {
      setErrorMsg(res.data.msg);
      setProgress(false);
    }
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
                {!progress ? (
                  <button
                    type='submit'
                    style={
                      !userInfoValues
                        ? { cursor: 'not-allowed' }
                        : { border: 'none' }
                    }
                  >
                    {!progress ? 'Sign In' : 'Processing...'}
                  </button>
                ) : (
                  <button
                    type='submit'
                    disabled
                    style={
                      !userInfoValues
                        ? { cursor: 'not-allowed' }
                        : { border: 'none' }
                    }
                  >
                    {!progress ? 'Sign In' : 'Processing...'}
                  </button>
                )}
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
