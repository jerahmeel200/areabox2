// Layout Types
import { DefaultLayout } from './layouts';

// Route Views
import BlogOverview from './views/BlogOverview';
import UserProfileLite from './views/UserProfileLite';
import AddNewPost from './views/AddNewPost';
import CinemaManager from './views/CinemaManager';
import LiveStream from './views/LiveStream';
import Errors from './views/Errors';
import Restrict from './views/Restrict';
import ComponentsOverview from './views/ComponentsOverview';
import Tables from './views/Tables';
import BlogPosts from './views/BlogPosts';
import UserManagement from './views/UserManagement';
import Feed from './views/Feed';
import * as ROLES from './roles'; // Import your roles
export default [
  // {
  //   path: "/",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: () => <Redirect to="/login" />,
  //   public: true
  // },
  // {
  //   path: "/login",
  //   layout: DefaultLayout,
  //   component: Login,
  //   public: true
  // },
  {
    path: '/manage-users',
    layout: DefaultLayout,
    component: UserManagement,
    public: false,
    allowedRoles: [ROLES.GLOBALSUPERADMIN, ROLES.GLOBALADMIN]
  },
  {
    path: '/restrict',
    layout: DefaultLayout,
    component: Restrict,
    public: false
  },
  {
    path: '/blog-overview',
    layout: DefaultLayout,
    component: BlogOverview,
    allowedRoles: [ROLES.GLOBALSUPERADMIN, ROLES.GLOBALADMIN]
  },
  {
    path: '/user-profile-lite',
    layout: DefaultLayout,
    component: UserProfileLite,
    public: false,
    allowedRoles: [ROLES.GLOBALSUPERADMIN, ROLES.GLOBALADMIN]
  },
  {
    path: '/add-new-post',
    layout: DefaultLayout,
    component: AddNewPost,
    public: false,
    allowedRoles: [
      ROLES.GLOBALSUPERADMIN,
      ROLES.GLOBALADMIN,
      ROLES.CHANNELMODERATOR,
      ROLES.CHANNELMODERATOR
    ]
  },
  {
    path: '/cinema-manager',
    layout: DefaultLayout,
    component: CinemaManager,
    public: false,
    allowedRoles: [ROLES.GLOBALSUPERADMIN, ROLES.GLOBALADMIN]
  },
  {
    path: '/new-livestream',
    layout: DefaultLayout,
    component: LiveStream,
    public: false,
    allowedRoles: [ROLES.GLOBALSUPERADMIN, ROLES.GLOBALADMIN]
  },
  {
    path: '/get-feed',
    layout: DefaultLayout,
    component: Feed,
    public: false,
    allowedRoles: [ROLES.GLOBALSUPERADMIN, ROLES.GLOBALADMIN]
  },
  // {
  //   path: "/errors",
  //   layout: DefaultLayout,
  //   component: Errors,
  //   public: true
  // },
  {
    path: '/components-overview',
    layout: DefaultLayout,
    component: ComponentsOverview,
    public: false,
    allowedRoles: [ROLES.GLOBALSUPERADMIN, ROLES.GLOBALADMIN]
  },
  {
    path: '/tables',
    layout: DefaultLayout,
    component: Tables,
    public: false,
    allowedRoles: [ROLES.GLOBALSUPERADMIN, ROLES.GLOBALADMIN]
  },
  {
    path: '/blog-posts',
    layout: DefaultLayout,
    component: BlogPosts,
    public: false,
    allowedRoles: [ROLES.GLOBALSUPERADMIN, ROLES.GLOBALADMIN]
  }
];
