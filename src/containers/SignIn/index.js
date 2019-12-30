import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Input, Icon, Button, Spin } from 'antd';
import { postSignInAction, onChangeEmailAction, onChangePasswordAction } from './signin.reducer';

const SignIn = () => {
  const email = useSelector(({ signin }) => signin.signInForm.email);
  const password = useSelector(({ signin }) => signin.signInForm.password);
  const loading = useSelector(({ signin }) => signin.signInForm.loading);

  const dispatch = useDispatch();
  const postSignIn = useCallback(() => dispatch(postSignInAction()), []);
  const onChangeEmail = useCallback(e => dispatch(onChangeEmailAction(e.target.value)), []);
  const onChangePassword = useCallback(e => dispatch(onChangePasswordAction(e.target.value)), []);

  return (
    <>
      <Helmet>
        <title>SignIn</title>
        <meta name="description" content="Description of SignIn" />
      </Helmet>
      <Spin spinning={loading}>
        <div style={{ marginBottom: 16 }}>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
            size="large"
            onChange={onChangeEmail}
            onPressEnter={postSignIn}
            value={email}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Password"
            size="large"
            onChange={onChangePassword}
            onPressEnter={postSignIn}
            value={password}
          />
        </div>
        <Button type="primary" onClick={postSignIn}>
          Sign In
        </Button>
      </Spin>
    </>
  );
};

export default SignIn;
