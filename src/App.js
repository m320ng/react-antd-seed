import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { Layout } from 'antd';

import Header from 'components/Header';
import Sider from 'components/Sider';
import mainRoutes from 'routes/mainRoutes';

import SignIn from 'containers/SignIn';
import NotFound from 'containers/NotFound';
import SharedComponent from 'containers/SharedComponent';

import Location from 'components/location';

const itemRender = (route, params, routes, paths) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? <span>{route.name}</span> : <Link to={paths.join('/')}>{route.name}</Link>;
};

const RouteLayout = ({ component: Component, ...rest }) => {
  console.log('RouteLayout');
  //todo: logic for validate user
  console.log('rest', rest);

  return (
    <Route
      {...rest}
      render={matchProps =>
        rest.auth && !localStorage.getItem('token') ? (
          <Redirect to="/signin" />
        ) : (
          <Layout style={{ minHeight: '100vh' }}>
            <Sider />
            <Layout>
              <Header />
              <Layout.Content>
                <Location routes={mainRoutes} />
                <div style={{ padding: '16px' }}>
                  <Component {...matchProps} />
                </div>
              </Layout.Content>
              <Layout.Footer style={{ textAlign: 'center' }}>UI Test</Layout.Footer>
            </Layout>
          </Layout>
        )
      }
    />
  );
};

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/signin" name="로그인" icon="login" component={SignIn} />
        {mainRoutes.map(route =>
          route.children && route.children.length ? (
            route.children.map(subroute => <RouteLayout {...subroute} />)
          ) : (
            <RouteLayout {...route} />
          ),
        )}
        <Route component={NotFound} />
      </Switch>
      <SharedComponent />
    </>
  );
}
