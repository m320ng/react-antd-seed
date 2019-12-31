import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Input, Icon, Upload } from 'antd';
import { selectDetailModalShow, detailModalShowAction } from '../users.reducer';

import WriteForm from './writeForm';

const WriteModal = props => {
  const writeFormShow = useSelector(selectDetailModalShow);

  const dispatch = useDispatch();
  const onCancel = () => {
    dispatch(detailModalShowAction(false));
  };

  const postPosts = () => {};

  return (
    <Modal title="회원 정보" visible={writeFormShow} onOk={postPosts} onCancel={onCancel} footer={false} width="100vh">
      <WriteForm id={1} />
    </Modal>
  );
};

export default WriteModal;