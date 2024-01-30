// Layout Types
import { DefaultLayout, AuthLayout } from './layouts';

// Route Views
import Login from './views/Login';
import Errors from './views/Errors';

export default [
  {
    path: '/',
    exact: true,
    layout: AuthLayout,
    component: Login
    // component: () => <Redirect to="/login" />,
  },
  {
    path: '/login',
    exact: true,
    layout: AuthLayout,
    component: Login
  },
  {
    path: '/errors',
    layout: DefaultLayout,
    component: Errors
  }
];
