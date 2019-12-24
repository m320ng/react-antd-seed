import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Layout, Icon, Menu } from 'antd';

import mainRoutes from 'routes/mainRoutes';

const Sider = ({ location, history }) => {
  const user = useSelector(({ global }) => global.user);

  return (
    <Layout.Sider>
      <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline">
        {mainRoutes.map(route =>
          !route.auth || (!route.permission && user) || (user && user.permissions.includes(route.permission)) ? (
            <Menu.Item key={route.path || '/notfound'}>
              <Link to={route.path || '/notfound'}>
                <Icon type={route.icon} />
                <span>{route.name}</span>
              </Link>
            </Menu.Item>
          ) : (
            <React.Fragment />
          ),
        )}
      </Menu>
    </Layout.Sider>
  );
};

export default withRouter(props => <Sider {...props} />);
