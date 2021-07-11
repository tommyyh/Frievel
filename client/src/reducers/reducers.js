import { combineReducers } from 'redux';
import { isLogged } from './isLogged';
import { name, username, email, profilePic } from './user';
import { posts } from './posts';

// All reducers
const reducers = combineReducers({
  isLogged,
  name,
  username,
  email,
  profilePic,
  posts,
});

export default reducers;
