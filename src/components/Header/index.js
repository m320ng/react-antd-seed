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
    <Layout.Header
      style={{
        background: '#fff',
        height: '48px',
        padding: '0',
      }}
    >
      <div
        style={{
          padding: '0 16px',
          height: '48px',
          position: 'relative',
          lineHeight: '48px',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)',
        }}
      >
        <Icon className="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggle} />
        <span level={4} style={{ lineHeight: '48px', float: 'right' }}>
          <Icon type="user" /> {user ? user.permission : ''}
        </span>
      </div>
    </Layout.Header>
  );
};

export default Header;
