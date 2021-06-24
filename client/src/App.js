import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route component={Home} path='/' exact />
      <Route component={Login} path='/login' exact />
      <Route component={Register} path='/register' exact />
    </Router>
  );
}

export default App;
