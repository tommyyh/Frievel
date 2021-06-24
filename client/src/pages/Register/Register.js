import React from 'react';
import './register.scss';
import Logo from '../../components/logo/Logo';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <>
      <main className='register'>
        <div className='register_logo'>
          <Logo />
        </div>
        <h1>Sign Up</h1>
        <div className='register_form'>
          <form>
            <div>
              <input type='text' id='register_name' placeholder='Full name' />
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
      </main>
    </>
  );
};

export default Register;
