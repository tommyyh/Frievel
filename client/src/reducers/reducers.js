import { combineReducers } from 'redux';
import { isLogged } from './isLogged';

// All reducers
const reducers = combineReducers({
  isLogged,
});

export default reducers;
