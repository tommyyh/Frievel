import React, { useState, useEffect } from 'react';
import './inbox.scss';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Loading from '../../components/Loading/Loading';
import Header from '../../components/Header/Header';
import Messages from './components/Messages';
import DirectMessages from '../DirectMsg/components/Messages';
import MsgMenu from '../DirectMsg/components/MsgMenu';

const Inbox = ({ message }) => {
  const [loading, setLoading] = useState(true);
  const [myMessages, setMyMessages] = useState([]);
  const [user, setUser] = useState({});
  const pathName = window.location.pathname;
  const { id } = useParams();
  const useEffectParams = window.location.pathname === `/inbox/${id}` && id;
  const { push } = useHistory();

  useEffect(() => {
    const getMyMessages = async () => {
      const res = await axios.get('/user/my-messages/');

      setMyMessages(res.data.messages);
      setLoading(false);
    };

    const getUser = async () => {
      const res = await axios.get(`/room/get-user/${id}`);

      if (res.data.status === 401) {
        return push('/inbox');
      } else {
        setUser(res.data.direct_msg);
        setLoading(false);
      }
    };

    getMyMessages();
    if (window.location.pathname === `/inbox/${id}`) {
      getUser();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useEffectParams]);
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
          <Messages currentlySelected={id} myMessages={myMessages} />
          {pathName === '/inbox' ? (
            <>
              <div className='inbox_right'>
                <h2>My messages</h2>
                <p>Select a chat to send messages and photos</p>
              </div>
            </>
          ) : (
            <div className='inbox_scroll'>
              <DirectMessages messages={message} user={user} />
              <MsgMenu />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Inbox;
