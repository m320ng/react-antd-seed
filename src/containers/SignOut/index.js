import React from 'react';
import { Helmet } from 'react-helmet';

function SignOut() {
  console.log('SignOut');
  return (
    <>
      <Helmet>
        <title>SignOut</title>
        <meta name="description" content="Description of SignIn" />
      </Helmet>
      <div>SignOut</div>
    </>
  );
}

export default SignOut;
