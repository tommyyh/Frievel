import React, { useState, useEffect } from 'react';
import './inbox.scss';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Loading from '../../components/Loading/Loading';
import Header from '../../components/Header/Header';
import Messages from './components/Messages';

const Inbox = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Inbox (3) • Frievel</title>
        </Helmet>
      </HelmetProvider>
      <Header />
      <main className='inbox_parent'>
        <div className='inbox'>
          <Messages />
          <div className='inbox_right'>
            <h1>My messages</h1>
            <p>Select a chat to send messages and photos</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Inbox;
