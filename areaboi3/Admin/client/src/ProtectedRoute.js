import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  user,
  isLoggedIn,
  allowedRoles,
  ...rest
}) => {
  let hasRequiredRole = false;

  if (allowedRoles?.length) {
    hasRequiredRole = allowedRoles.includes(user?.role);
  } else {
    // If no specific roles are required, allow access
    hasRequiredRole = true;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && hasRequiredRole ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  );
};

export default withRouter(ProtectedRoute);
