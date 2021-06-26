import React from 'react';
import './login.scss';
import Logo from '../../components/logo/Logo';
import { Link } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const Login = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Login • Frievel</title>
        </Helmet>
      </HelmetProvider>
      <main className='login'>
        <div className='login_logo'>
          <Logo />
        </div>
        <h1>Sign In</h1>
        <div className='login_form'>
          <form>
            <div>
              <input type='text' id='login_email' placeholder='Email Address' />
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
          Don't have an account?{' '}
          <span>
            <Link to='/register'>Sign up</Link>
          </span>
        </p>
      </main>
    </>
  );
};

export default Login;
