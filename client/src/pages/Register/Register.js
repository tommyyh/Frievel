import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import './register.scss';
import Logo from '../../components/logo/Logo';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import defaultPic from '../../assets/img/default_profile.jpg';

const Register = () => {
  const [loading, setLoading] = useState(true);
  const { push } = useHistory();
  const [processing, setProcessing] = useState(false);
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

    return () => {
      setLoading(null);
      setProcessing(null);
      setUserInfo(null);
      setErrorMsg(null);
    };
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    setProcessing(true);

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

    const data = new FormData();

    data.append('profilePic', file);
    data.append('fullName', userInfo.fullName);
    data.append('email', userInfo.email);
    data.append('password', userInfo.password);
    data.append('username', userInfo.username);

    const res = await axios.post('/user/register/', data);

    if (res.data.status === 201) {
      setUserInfo({
        fullName: '',
        email: '',
        password: '',
        username: '',
      });

      push('/login');
    } else {
      !res.data.msg ? setErrorMsg('') : setErrorMsg(res.data.msg);
      setProcessing(false);
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
                    maxLength='150'
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
                    maxLength='100'
                    value={userInfo.username}
                  />
                </div>
                <div>
                  <input
                    type='text'
                    id='register_email'
                    name='email'
                    placeholder='Email Address'
                    maxLength='180'
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
                    maxLength='180'
                    onChange={(e) => {
                      onChange(e);
                      setErrorMsg('');
                    }}
                    value={userInfo.password}
                  />
                </div>
                {!processing ? (
                  <button
                    type='submit'
                    style={
                      !userInfoValues
                        ? { cursor: 'not-allowed' }
                        : { border: 'none' }
                    }
                  >
                    {!processing ? 'Sign Up' : 'Processing...'}
                  </button>
                ) : (
                  <button
                    type='submit'
                    disabled={true}
                    style={
                      !userInfoValues
                        ? { cursor: 'not-allowed' }
                        : { border: 'none' }
                    }
                  >
                    {!processing ? 'Sign Up' : 'Processing...'}
                  </button>
                )}
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
