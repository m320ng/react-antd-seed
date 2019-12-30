import Board from 'containers/Board';
import Users from 'containers/Users';
import UsersList from 'containers/Users/list';

import SignOut from 'containers/SignOut';
import CalendarSample from 'containers/Calendar';
import EditorSample from 'containers/Editor';

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
        component: UsersList,
        auth: true,
        permission: 'admin',
      },
    ],
  },
  {
    path: '/calendar',
    name: '달력',
    icon: 'calendar',
    component: CalendarSample,
    auth: true,
    permission: 'admin',
  },
  {
    path: '/editor',
    name: '에디터',
    icon: 'edit',
    component: EditorSample,
    auth: true,
    permission: 'admin',
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
];

export default mainRoutes;
