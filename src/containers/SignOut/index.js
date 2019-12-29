import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router';

const SignOut = () => {
  localStorage.removeItem('token');
  return (
    <>
      <Redirect to="/signin" />
    </>
  );
};

export default SignOut;
