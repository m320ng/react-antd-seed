import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Layout, Icon, Menu } from 'antd';
import mainRoutes from 'routes/mainRoutes';

const { SubMenu } = Menu;

const Sider = ({ location, history }) => {
  const user = useSelector(({ global }) => global.user);

  return (
    <Layout.Sider>
      <Menu theme="" selectedKeys={[location.pathname]} mode="inline">
        {mainRoutes.map(route =>
          !route.auth || (!route.permission && user) || (user && user.permissions.includes(route.permission)) ? (
            route.childs && route.childs.length ? (
              <SubMenu
                title={
                  <span>
                    <Icon type={route.icon} />
                    {route.name}
                  </span>
                }
              >
                {route.childs.map(subroute => (
                  <Menu.Item key={subroute.path || '/notfound'}>
                    <Link to={subroute.path || '/notfound'}>
                      <Icon type={subroute.icon} />
                      <span>{subroute.name}</span>
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={route.path || '/notfound'}>
                <Link to={route.path || '/notfound'}>
                  <Icon type={route.icon} />
                  <span>{route.name}</span>
                </Link>
              </Menu.Item>
            )
          ) : (
            <React.Fragment />
          ),
        )}
      </Menu>
    </Layout.Sider>
  );
};

export default withRouter(props => <Sider {...props} />);
