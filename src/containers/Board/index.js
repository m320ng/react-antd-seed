import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Button } from 'antd';
import { SideSheet, Paragraph } from 'evergreen-ui';
import { getPostsAction, handleModalShowAction } from './board.reducer';

import WritePostModal from './WritePostModal';
import PostTable from './PostTable';

const Board = () => {
  const [isShow, setIsShow] = useState(false);

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
      <SideSheet isShown={isShow} onCloseComplete={() => setIsShow(false)}>
        <Paragraph margin={40}>Basic Example</Paragraph>
      </SideSheet>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleModalShow}>
          Write
        </Button>
        <Button onClick={() => setIsShow(true)}>Show Basic Side Sheet</Button>{' '}
      </div>
      <PostTable />
    </>
  );
};

export default Board;
