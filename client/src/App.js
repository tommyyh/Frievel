import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Saved from './pages/Saved/Saved';
import Inbox from './pages/Inbox/Inbox';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route component={Home} path='/' exact />
      <Route component={Login} path='/login' exact />
      <Route component={Register} path='/register' exact />
      <Route component={Saved} path='/saved' exact />
      <Route component={Inbox} path='/inbox' exact />
    </Router>
  );
}

export default App;
