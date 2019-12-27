import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Button, Pagination } from 'antd';
import { SideSheet, Paragraph } from 'evergreen-ui';
import { getPostsAction, handleModalShowAction } from './users.reducer';

//import CreateModal from './CreateModal';
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

  const page = useSelector(({ users }) => users.page);
  //const total = useSelector(({ users }) => users.total);
  //const pages = pagingList.pages;
  //console.log(pagingRequest);
  console.log(pagingList);

  const dispatch = useDispatch();
  const getPosts = () => dispatch(getPostsAction());
  const handleModalShow = () => dispatch(handleModalShowAction());

  const onPageChange = (page, pageSize) => {
    //pagingRequest.page = page;
    //console.log(pageSize);
    //pagingRequest.limit = pageSize;
    //getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>회원 목록</title>
        <meta name="description" content="회원 목록" />
      </Helmet>
      <SideSheet isShown={isShow} onCloseComplete={() => setIsShow(false)}>
        <Paragraph margin={40}>Basic Example</Paragraph>
      </SideSheet>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleModalShow}>
          Write
        </Button>
        <Button onClick={() => setIsShow(true)}>Show Basic Side Sheet</Button>{' '}
      </div>
      <ListTable postList={pagingList.list} loading={loading} />
      <div style={{ textAlign: 'center' }}>
        <Pagination
          onChange={onPageChange}
          current={page}
          pages={pagingList.limit}
          total={pagingList.total}
          itemRender={itemRender}
          style={{ display: 'inline-block', margin: '10px 0px' }}
        />
      </div>
    </>
  );
};

export default Users;
