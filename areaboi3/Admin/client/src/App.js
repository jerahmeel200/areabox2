import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import routes from './routes';
import publicRoutes from './publicRoutes';
import withTracker from './withTracker';

import ProtectedRoute from './ProtectedRoute';
import { AuthContext } from './context/Context';
import * as ROLES from './roles'; // Import your roles

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/shards-dashboards.1.1.0.min.css';

export default () => {
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <Router>
      <Switch basename={''}>
        <div>
          {publicRoutes.map((route, index) => (
            <Route
              key={route?.path}
              path={route?.path}
              exact={route?.exact}
              component={withTracker((props) => (
                <route.layout {...props}>
                  <route.component {...props} />
                </route.layout>
              ))}
            />
          ))}
          {routes.map((route, index) => (
            <ProtectedRoute
              key={route?.path}
              path={route?.path}
              exact={route?.exact}
              isLoggedIn={isLoggedIn}
              user={user}
              allowedRoles={route?.allowedRoles} // Use allowedRoles from your route configuration
              component={withTracker((props) => (
                <route.layout {...props}>
                  <route.component {...props} />
                </route.layout>
              ))}
            />
          ))}
        </div>
      </Switch>
    </Router>
  );
};
