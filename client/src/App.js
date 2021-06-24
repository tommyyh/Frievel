import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route component={Home} path='/' exact />
      <Route component={Login} path='/login' exact />
    </Router>
  );
}

export default App;
