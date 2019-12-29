import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Icon } from 'antd';

const Header = () => {
  const user = useSelector(({ global }) => global.user);
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(prevState => !prevState);
  };

  return (
    <Layout.Header style={{ height: '48px', lineHeight: '48px', padding: '0 30px' }}>
      <Link to="/">
        <span style={{ lineHeight: '48px', fontWeight: 'bold', fontSize: 'medium' }}>
          <Icon type="layout" /> Logo
        </span>
      </Link>
      <Icon className="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggle} />
      <span level={4} style={{ lineHeight: '48px', float: 'right', color: 'rgba(255, 255, 255, 0.65)' }}>
        <Icon type="user" /> {user ? user.permission : ''}
      </span>
    </Layout.Header>
  );
};

export default Header;
