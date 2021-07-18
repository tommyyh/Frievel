import { combineReducers } from 'redux';
import { isLogged } from './isLogged';
import { name, username, email, profilePic } from './user';
import { posts } from './posts';
import { socket } from './socket';
import { unread } from './unread';
import { msg } from './msg';

// All reducers
const reducers = combineReducers({
  isLogged,
  name,
  username,
  email,
  profilePic,
  posts,
  socket,
  unread,
  msg,
});

export default reducers;
