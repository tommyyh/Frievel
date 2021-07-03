import React, { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import './login.scss';
import Logo from '../../components/logo/Logo';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

const Login = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

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
            <h1>Sign In</h1>
            <div className='login_form'>
              <form>
                <div>
                  <input
                    type='text'
                    id='login_email'
                    placeholder='Email Address'
                  />
                </div>
                <div>
                  <input
                    type='password'
                    id='login_password'
                    placeholder='Password'
                  />
                </div>
                <button type='submit'>Sign In</button>
              </form>
            </div>
            <p>
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
