import React from 'react';
import NavbarContainer from './navbar/navbar_container';
import { Route, HashRouter, Switch } from 'react-router-dom';
import SessionContainer from './session/session_container';
import SplashContainer from './splash/splash_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Provider } from 'react-redux';

const App = () => (
  <div>
      <AuthRoute path ='/' component={SplashContainer}/>
      <ProtectedRoute path ='/' component={NavbarContainer} />

    <Switch>
      <AuthRoute exact path='/login' component={SessionContainer} />
      <AuthRoute exact path='/signup' component={SessionContainer} />
    </Switch>
  </div>
);

export default App;
