import React, { useEffect, useMemo } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Breadcrumb, Divider } from 'antd';

const Location = ({ routes, location }) => {
  let history = [];

  useMemo(() => {
    const walk = (list, prev) => {
      for (let e of list) {
        let h = [...prev, { ...e }];
        if (e.path == location.pathname) {
          console.log('matched', e);
          history = h;
          break;
        }
        if (e.children) {
          walk(e.children, h);
        }
      }
    };
    walk(routes, []);
    history = [{ name: '홈', path: '/' }, ...history];
  }, [location]);

  const itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.name}</span> : <Link to={route.path}>{route.name}</Link>;
  };

  console.log('location', location.pathname);
  console.log('history', history);
  return (
    location.pathname !== '/' && (
      <div style={{ background: '', padding: '8px 16px' }}>
        <Breadcrumb itemRender={itemRender} routes={history} />
      </div>
    )
  );
};

export default withRouter(props => <Location {...props} />);
