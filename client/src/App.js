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

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Home} path='/' exact />
        <Route component={Login} path='/login' exact />
        <Route component={Register} path='/register' exact />
        <Route component={Saved} path='/saved' exact />
        <Route component={Inbox} path='/inbox' exact />
        <Route component={DirectMsg} path='/inbox/:username' exact />
        <Route component={Profile} path='/profile/:username' exact />
        <Route component={Comments} path='/post/:id' exact />
        <Route component={NotFound} path='*' exact />
      </Switch>
    </Router>
  );
}

export default App;
