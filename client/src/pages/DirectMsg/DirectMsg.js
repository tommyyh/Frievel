import React, { useState, useEffect } from 'react';
import './directMsg.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Loading from '../../components/Loading/Loading';
import MsgMenu from './components/MsgMenu';
import Messages from './components/Messages';
import Inbox from '../Inbox/Inbox';
import { SET_SOCKET } from '../../actions/socket';

const DirectMsg = () => {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState();
  const [msg, setMsg] = useState([]);
  const dispatch = useDispatch();
  const desktopScreen = useMediaQuery({
    query: '(min-device-width: 1025px)',
  });
  const { id } = useParams();
  const mobileScreen = useMediaQuery({ query: '(max-device-width: 480px)' });

  useEffect(() => {
    const getDirectMessages = async () => {
      // const res = await axios.get(`/room/inbox/${id}`);
      // console.log(res.data);
    };

    getDirectMessages(); // eslint-disable-next-line react-hooks/exhaustive-deps

    // Make socket connection
    const socket = new WebSocket(`ws://localhost:5000/ws/${id}/`);
    setSocket(socket); // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(SET_SOCKET(socket)); // eslint-disable-next-line react-hooks/exhaustive-deps
    setLoading(false); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <Loading />;

  // Handle socket events
  socket.onmessage = (e) => {
    const messageReceived = JSON.parse(e.data);
    const { message, username, name, profilePic, sentAt } = messageReceived;

    setMsg([
      ...msg,
      {
        message: message,
        username: username,
        name: name,
        profilePic: profilePic,
        sentAt: sentAt,
      },
    ]);
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
          <main>
            <Messages messages={msg} />
          </main>
        </>
      )}
      {desktopScreen && (
        <main>
          <Inbox message={msg} />
        </main>
      )}
    </>
  );
};

export default DirectMsg;
