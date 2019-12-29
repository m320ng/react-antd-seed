import Board from 'containers/Board';
import Users from 'containers/Users';
import Users2 from 'containers/Users/index2';

import SignIn from 'containers/SignIn/index2';
import SignOut from 'containers/SignOut';
import NotFound from 'containers/NotFound';

const mainRoutes = [
  {
    exact: true,
    path: '/',
    name: 'Home',
    icon: 'home',
    component: Board,
    auth: true,
    permission: 'admin',
  },
  {
    name: '회원관리',
    icon: 'mail',
    childs: [
      {
        exact: true,
        path: '/users/list1',
        name: '회원목록1',
        icon: 'mail',
        component: Users,
        auth: true,
        permission: 'admin',
      },
      {
        exact: true,
        path: '/users/list2',
        name: '회원목록2',
        icon: 'mail',
        component: Users2,
        auth: true,
        permission: 'admin',
      },
    ],
  },
  /*
  {
    path: '/signin',
    name: 'Sign In',
    icon: 'login',
    component: SignIn,
  },
  */
  {
    path: '/signout',
    name: 'Sign Out',
    icon: 'logout',
    component: SignOut,
  },
  {
    path: '',
    name: 'Not Found',
    icon: 'close-circle',
    component: NotFound,
  },
];

export default mainRoutes;
