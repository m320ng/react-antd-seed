import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import Header from 'components/Header';
import Sider from 'components/Sider';
import mainRoutes from 'routes/mainRoutes';

import SignIn from 'containers/SignIn/index2';

const RouteLayout = ({ component: Component, ...rest }) => {
  console.log('RouteLayout');
  //todo: logic for validate user

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout style={{ minHeight: '100vh' }}>
          <Header />
          <Layout>
            <Sider />
            <Layout>
              <Layout.Content style={{ margin: '16px' }}>
                <Component {...matchProps} />
              </Layout.Content>
              <Layout.Footer style={{ textAlign: 'center' }}>UI Test</Layout.Footer>
            </Layout>
          </Layout>
        </Layout>
      )}
    />
  );
};

export default function App() {
  console.log(localStorage.getItem('token'));
  return (
    <Switch>
      <Route path="/signin" name="로그인" icon="login" component={SignIn} />
      {mainRoutes.map(route =>
        route.auth && !localStorage.getItem('token') ? (
          <Redirect to={{ pathname: '/signin' }} />
        ) : route.childs && route.childs.length ? (
          route.childs.map(subroute => <RouteLayout {...subroute} />)
        ) : (
          <RouteLayout {...route} />
        ),
      )}
    </Switch>
  );
}
