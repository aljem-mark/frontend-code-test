import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AuthRoute from './components/routes/AuthRoute';
import Login from './pages/Login';
import Devices from './pages/Devices';

function App() {
  return (
    <Router>
      <Switch>
        <AuthRoute path="/login" render={() => <Login />} type="guest" />
        <AuthRoute path="/devices" render={() => <Devices />} type="private" />
      </Switch>
    </Router>
  );
}

export default App;
