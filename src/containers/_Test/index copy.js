import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Button, Pagination } from 'antd';
import { getPostsAction, handleModalShowAction } from './users.reducer';

import WriteModal from './WriteModal';
import ListTable from './ListTable';

function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <a>이전</a>;
  }
  if (type === 'next') {
    return <a>다음</a>;
  }
  return originalElement;
}

const Users = () => {
  const [isShow, setIsShow] = useState(false);

  const pagingList = useSelector(({ users }) => users.pagingList);
  const pagingRequest = useSelector(({ users }) => users.pagingRequest);
  const loading = useSelector(({ users }) => users.loading);

  //const page = useSelector(({ users }) => users.page);
  //const total = useSelector(({ users }) => users.total);
  //const pages = pagingList.pages;
  //console.log(pagingRequest);

  const dispatch = useDispatch();
  const getPosts = pagingRequest => dispatch(getPostsAction(pagingRequest));
  const handleModalShow = () => dispatch(handleModalShowAction());

  const onPageChange = (page, pageSize) => {
    //pagingRequest.page = page;
    console.log('page', page);
    console.log('pageSize', pageSize);
    //pagingRequest.limit = pageSize;
    //getPosts(pagingRequest);
    /*
    setPagingRequest({
      page: page,
      limit: 20,
    });
    getPosts({
      page: page,
      limit: 20,
    });
    */
  };

  useEffect(() => {
    console.log('pagingRequest', pagingRequest);
    /*
    getPosts({
      page: 1,
      limit: 20,
    });
    */
  }, []);

  console.log(pagingRequest);
  console.log(pagingList);

  return (
    <>
      <Helmet>
        <title>회원 목록</title>
        <meta name="description" content="회원 목록" />
      </Helmet>
      <WriteModal />
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleModalShow}>
          Write
        </Button>
      </div>
      <div style={{}}>
        <ListTable />
        <div style={{ textAlign: 'center' }}>
          <Pagination
            onChange={onPageChange}
            current={pagingList.page}
            pageSize={pagingList.limit}
            total={pagingList.total}
            itemRender={itemRender}
            showQuickJumper
            style={{ display: 'inline-block', margin: '10px 0px' }}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
