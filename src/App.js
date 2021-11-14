import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AuthRoute from './components/Route/AuthRoute';
import Login from './pages/Login';
import Devices from './pages/Devices';

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path="/" render={() => <Redirect to="/login" />} /> */}
        <AuthRoute path="/login" render={() => <Login />} type="guest" />
        <AuthRoute path="/devices" render={() => <Devices />} type="private" />
      </Switch>
    </Router>
  );
}

export default App;
