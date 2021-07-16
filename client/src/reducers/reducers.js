import { combineReducers } from 'redux';
import { isLogged } from './isLogged';
import { name, username, email, profilePic } from './user';
import { posts } from './posts';
import { socket } from './socket';

// All reducers
const reducers = combineReducers({
  isLogged,
  name,
  username,
  email,
  profilePic,
  posts,
  socket,
});

export default reducers;
