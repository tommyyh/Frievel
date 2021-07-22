import React, { useState, useEffect, useRef } from 'react';
import './inbox.scss';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Loading from '../../components/Loading/Loading';
import Header from '../../components/Header/Header';
import Messages from './components/Messages';
import DirectMessages from '../DirectMsg/components/Messages';
import MsgMenu from '../DirectMsg/components/MsgMenu';
import { SET_MSG } from '../../actions/msg';

const Inbox = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [stopScroll, setStopScroll] = useState(false);
  const [ammount, setAmmount] = useState(9);
  const pathName = window.location.pathname;
  const { id } = useParams();
  const useEffectParams = window.location.pathname === `/inbox/${id}` && id;
  const { push } = useHistory();
  const messagesRef = useRef();
  const dispatch = useDispatch();
  const msg = useSelector((state) => state.msg);

  useEffect(() => {
    setLoading(true);

    if (
      window.location.pathname === `/inbox/${id}/` ||
      window.location.pathname === `/inbox/${id}`
    ) {
      (async () => {
        const res = await axios.get(`/room/get-user/${id}/`);

        if (res.data.status === 401) {
          return push('/inbox');
        } else {
          setUser(res.data.direct_msg);
        }
      })(); // eslint-disable-next-line react-hooks/exhaustive-deps
    } // eslint-disable-next-line react-hooks/exhaustive-deps

    setLoading(false);

    return () => {
      setLoading(null);
      setUser(null);
      setStopScroll(null);
      setAmmount(null);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useEffectParams]);

  // End at the end of the div on msg change
  useEffect(() => {
    if (messagesRef.current && !stopScroll) {
      const element = messagesRef.current;

      element.scrollTop = element.scrollHeight - element.clientHeight;
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg]);

  if (loading) return <Loading />;

  const getMore = async (e) => {
    if (e.scrollTop === 0) {
      setStopScroll(true);

      const res = await axios.post(`/room/inbox/${id}/`, {
        ammount: ammount + 9,
      });

      if (res.data.count === msg.length) {
        return;
      }

      const msgs = res.data.messages.reverse();

      setAmmount((prev) => prev + 9);
      dispatch(SET_MSG(msgs));
      setStopScroll(false);
    }
  };

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
          <Messages currentlySelected={id} />
          {pathName === '/inbox' || pathName === '/inbox/' ? (
            <>
              <div className='inbox_right'>
                <h2>My messages</h2>
                <p>Select a chat to send messages and photos</p>
              </div>
            </>
          ) : (
            <div
              className='inbox_scroll'
              ref={messagesRef}
              onScroll={(e) => getMore(e.target)}
            >
              <DirectMessages user={user} loading={loading} />
              <MsgMenu messagesRef={messagesRef} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Inbox;
