import React, { useState, useEffect } from 'react';
import './directMsg.scss';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Loading from '../../components/Loading/Loading';
import MsgMenu from './components/MsgMenu';
import Messages from './components/Messages';

const DirectMsg = () => {
  const [loading, setLoading] = useState(true);

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
      <MsgMenu />
      <main>
        <Messages />
      </main>
    </>
  );
};

export default DirectMsg;
