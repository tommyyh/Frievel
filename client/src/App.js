import axios from 'axios';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
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

// Append CSRF token on every request
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function App() {
  const ProtectedRoute = ({ component, path, exact }) => {
    const isLogged = useSelector((state) => state.isLogged);

    return (
      <>
        {isLogged ? (
          <Route component={component} path={path} exact={exact} />
        ) : (
          <Redirect to='/login' />
        )}
      </>
    );
  };

  return (
    <Router>
      <Switch>
        <ProtectedRoute exact={true} component={Home} path='/' />
        <ProtectedRoute exact={true} component={Saved} path='/saved' />
        <ProtectedRoute exact={true} component={Inbox} path='/inbox' />
        <ProtectedRoute
          exact={true}
          component={DirectMsg}
          path='/inbox/:username'
        />
        <ProtectedRoute
          exact={true}
          component={Profile}
          path='/profile/:username'
        />
        <ProtectedRoute exact={true} component={Comments} path='/post/:id' />
        <Route component={Login} path='/login' exact />
        <Route component={Register} path='/register' exact />
        <Route component={NotFound} path='*' />
      </Switch>
    </Router>
  );
}

export default App;
