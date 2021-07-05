import { combineReducers } from 'redux';
import { isLogged } from './isLogged';
import { name, username, email, profilePic } from './user';

// All reducers
const reducers = combineReducers({
  isLogged,
  name,
  username,
  email,
  profilePic,
});

export default reducers;
