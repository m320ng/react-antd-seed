import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Button } from 'antd';

import WriteModal from './WriteModal';
import ListTable from './ListTable';
import DetailForm from './ListTable/detailForm';

const Users = () => {
  return (
    <>
      <Helmet>
        <title>회원 목록</title>
        <meta name="description" content="회원 목록" />
      </Helmet>
      <ListTable />
    </>
  );
};

export default Users;
