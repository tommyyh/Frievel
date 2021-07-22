import React, { useState, useEffect } from 'react';
import './notFound.scss';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Loading from '../../components/Loading/Loading';

const NotFound = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Page Not Found • Frievel</title>
        </Helmet>
      </HelmetProvider>
      <main className='notFound'>
        <h1>
          <span>We're sorry, but the</span>
          <span>page you’re looking for cannot be found</span>
        </h1>
        <div className='goBack_link'>
          <FaChevronLeft fill='#1e82df' size='1rem' />
          <Link to='/'>Go Back Home</Link>
        </div>
      </main>
    </>
  );
};

export default NotFound;
