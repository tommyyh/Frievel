import React, { useState, useEffect } from 'react';
import './inbox.scss';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Loading from '../../components/Loading/Loading';
import Header from '../../components/Header/Header';
import Messages from './components/Messages';
import DirectMessages from '../DirectMsg/components/Messages';
import MsgMenu from '../DirectMsg/components/MsgMenu';

const Inbox = () => {
  const [loading, setLoading] = useState(true);
  const pathName = window.location.pathname;

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
          {pathName === '/inbox' ? (
            <>
              <div className='inbox_right'>
                <h2>My messages</h2>
                <p>Select a chat to send messages and photos</p>
              </div>
            </>
          ) : (
            <div className='inbox_scroll'>
              <div className='inbox_scroll_right'>
                <h1>Clement Mihailescu</h1>
                <p>Active 4h ago</p>
              </div>
              <DirectMessages />
              <MsgMenu />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Inbox;
