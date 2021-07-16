import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Saved from './pages/Saved/Saved';
import Inbox from './pages/Inbox/Inbox';
import DirectMsg from './pages/DirectMsg/DirectMsg';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import Comments from './pages/Comments/Comments';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SIGN_IN } from './actions/isLogged';
import {
  SET_NAME,
  SET_EMAIL,
  SET_PROFILE_PIC,
  SET_USERNAME,
} from './actions/user';

// Append CSRF token on every request
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function App() {
  const dispatch = useDispatch();

  const ProtectedRoute = ({ component, path, exact }) => {
    const isLogged = useSelector((state) => state.isLogged);

    useEffect(() => {
      const authenticate = async () => {
        const res = await axios.get('http://localhost:5000/user/authenticate/');
        const { name, username, email, profile_pic } = res.data;

        if (res.data.status === 201) {
          dispatch(SIGN_IN());
          dispatch(SET_NAME(name));
          dispatch(SET_USERNAME(username));
          dispatch(SET_EMAIL(email));
          dispatch(SET_PROFILE_PIC(profile_pic));
        }
      };

      authenticate();
    }, []);

    return (
      <>
        {isLogged ? (
          <Route component={component} path={path} exact={exact} />
        ) : (
          <Login />
        )}
      </>
    );
  };

  const PublicRoute = ({ component, path, exact }) => {
    const isLogged = useSelector((state) => state.isLogged);

    useEffect(() => {
      const authenticate = async () => {
        const res = await axios.get('http://localhost:5000/user/authenticate/');
        const { name, username, email, profile_pic } = res.data;

        if (res.data.status === 201) {
          dispatch(SIGN_IN());
          dispatch(SET_NAME(name));
          dispatch(SET_USERNAME(username));
          dispatch(SET_EMAIL(email));
          dispatch(SET_PROFILE_PIC(profile_pic));
        }
      };

      authenticate();
    }, []);

    return (
      <>
        {isLogged ? (
          <Home />
        ) : (
          <Route component={component} path={path} exact={exact} />
        )}
      </>
    );
  };

  return (
    <Router>
      <Switch>
        <Route exact={true} component={Home} path='/' />
        <Route exact={true} component={Saved} path='/saved' />
        <Route exact={true} component={Inbox} path='/inbox' />
        <Route exact={true} component={DirectMsg} path='/inbox/:id' />
        <Route exact={true} component={Profile} path='/profile/:username' />
        <Route exact={true} component={Comments} path='/post/:id' />
        <Route component={Login} path='/login' exact={true} />
        <Route component={Register} path='/register' exact={true} />
        <Route component={NotFound} path='*' />
      </Switch>
    </Router>
  );
}

export default App;
