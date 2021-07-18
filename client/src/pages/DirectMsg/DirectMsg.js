import React, { useState, useEffect } from 'react';
import './directMsg.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Loading from '../../components/Loading/Loading';
import MsgMenu from './components/MsgMenu';
import Messages from './components/Messages';
import Inbox from '../Inbox/Inbox';
import { SET_SOCKET } from '../../actions/socket';
import { SET_UNREAD } from '../../actions/unread';
import { SET_MSG } from '../../actions/msg';

const DirectMsg = () => {
  const [loading, setLoading] = useState(true);
  const { push } = useHistory();
  const [socket, setSocket] = useState();
  const msg = useSelector((state) => state.msg);
  const dispatch = useDispatch();
  const desktopScreen = useMediaQuery({
    query: '(min-device-width: 1025px)',
  });
  const { id } = useParams();
  const mobileScreen = useMediaQuery({ query: '(max-device-width: 480px)' });

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/room/get-user/${id}`);

      if (res.data.status === 401) {
        return push('/inbox');
      }
    };

    const getDirectMessages = async () => {
      const res = await axios.post(`/room/inbox/${id}/`, {
        ammount: 9,
      });

      const msgs = res.data.messages.reverse();

      dispatch(SET_MSG(msgs));
    };

    getUser();
    getDirectMessages(); // eslint-disable-next-line react-hooks/exhaustive-deps

    // Make socket connection
    if (/^\d+$/.test(id)) {
      const socket = new WebSocket(`ws://localhost:5000/ws/${id}/`);

      setSocket(socket);
      dispatch(SET_SOCKET(socket));
      setLoading(false);
    } else {
      return push('/inbox');
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Loading />;

  // Handle socket events
  socket.onmessage = async (e) => {
    const messageReceived = JSON.parse(e.data);
    const { message, username, name, profilePic, sentAt } = messageReceived;

    dispatch(
      SET_MSG([
        ...msg,
        {
          message: message,
          username: username,
          name: name,
          profilePic: profilePic,
          sentAt: sentAt,
        },
      ])
    );

    const res = await axios.get('/room/get-unread/');

    dispatch(SET_UNREAD(res.data.unread));
  };

  socket.onclose = () => {
    new WebSocket(`ws://localhost:5000/ws/${id}/`);
  };

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
          <Messages />
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
