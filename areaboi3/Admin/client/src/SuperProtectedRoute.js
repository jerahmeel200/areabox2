import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import * as ROLES from './roles';
const SuperProtectedRoute = ({
  component: Component,
  user,
  isLoggedIn,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user && !!user.roles[ROLES.SUPERADMIN] ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  );
};

export default withRouter(SuperProtectedRoute);
