import React, { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import './register.scss';
import Logo from '../../components/logo/Logo';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

const Register = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

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
            <h1>Sign Up</h1>
            <div className='register_form'>
              <form>
                <div>
                  <input
                    type='text'
                    id='register_name'
                    placeholder='Full name'
                  />
                </div>
                <div>
                  <input
                    type='text'
                    id='register_email'
                    placeholder='Email Address'
                  />
                </div>
                <div>
                  <input
                    type='password'
                    id='register_password'
                    placeholder='Password'
                  />
                </div>
                <button type='submit'>Sign Up</button>
              </form>
            </div>
            <p>
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
