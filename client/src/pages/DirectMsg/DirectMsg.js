import React, { useState, useEffect } from 'react';
import './directMsg.scss';
import { useMediaQuery } from 'react-responsive';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Loading from '../../components/Loading/Loading';
import MsgMenu from './components/MsgMenu';
import Messages from './components/Messages';
import Inbox from '../Inbox/Inbox';

const DirectMsg = () => {
  const [loading, setLoading] = useState(true);
  const desktopScreen = useMediaQuery({
    query: '(min-device-width: 1025px)',
  });
  const mobileScreen = useMediaQuery({ query: '(max-device-width: 480px)' });

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Direct • Frievel</title>
        </Helmet>
      </HelmetProvider>
      {mobileScreen && (
        <>
          <MsgMenu />
          <main>
            <Messages />
          </main>
        </>
      )}
      {desktopScreen && (
        <main>
          <Inbox />
        </main>
      )}
    </>
  );
};

export default DirectMsg;
