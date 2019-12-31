import Dashboard from 'containers/Dashboard';
import Users from 'containers/Users';
import UsersList from 'containers/Users/list';
import Board from 'containers/Board';
import SignOut from 'containers/SignOut';
import CalendarSample from 'containers/Calendar';
import EditorSample from 'containers/Editor';

const mainRoutes = [
  {
    exact: true,
    path: '/',
    name: '홈',
    icon: 'home',
    component: Dashboard,
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
        name: '회원목록(Class)',
        icon: 'mail',
        component: Users,
        auth: true,
        permission: 'admin',
      },
      {
        exact: true,
        path: '/users/list2',
        name: '회원목록(Functional)',
        icon: 'mail',
        component: UsersList,
        auth: true,
        permission: 'admin',
      },
    ],
  },
  {
    path: '/board',
    name: '게시판(리덕스)',
    icon: 'dash',
    component: Board,
    auth: true,
    permission: 'admin',
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
    name: '로그인',
    icon: 'login',
    component: SignIn,
  },
  */
  {
    path: '/signout',
    name: '로그아웃',
    icon: 'logout',
    component: SignOut,
  },
];

export default mainRoutes;
