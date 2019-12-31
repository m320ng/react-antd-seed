import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Button } from 'antd';
import { getPostsAction, handleModalShowAction } from './board.reducer';

import WritePostModal from './WritePostModal';
import PostTable from './PostTable';

const Board = () => {
  const dispatch = useDispatch();
  const getPosts = () => dispatch(getPostsAction());
  const handleModalShow = () => dispatch(handleModalShowAction());

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Board</title>
        <meta name="description" content="Description of Board" />
      </Helmet>
      <WritePostModal />
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleModalShow}>
          Write
        </Button>
      </div>
      <PostTable />
    </>
  );
};

export default Board;
