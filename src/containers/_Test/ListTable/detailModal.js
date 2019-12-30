import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Input, Icon, Upload } from 'antd';

import { selectDetailModalShow, detailModalShowAction } from '../users.reducer';
import EditForm from './editForm';
import DetailForm from './detailForm';

const DetailModal = props => {
  const detailModalInfo = useSelector(selectDetailModalShow);
  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(detailModalShowAction({ ...detailModalInfo, visible: false }));
  };

  useEffect(() => {}, [props]);

  const onChangeForm = (type, id) => {
    dispatch(detailModalShowAction({ visible: true, type: type, id: id }));
  };

  return (
    <Modal
      title={props.title ? props.title : '회원 정보'}
      visible={detailModalInfo.visible}
      onCancel={onCancel}
      footer={false}
      width="100vh"
    >
      {detailModalInfo.type == 'detail' ? (
        <DetailForm onChangeForm={onChangeForm} type={detailModalInfo.type} id={detailModalInfo.id} />
      ) : (
        <EditForm onChangeForm={onChangeForm} type={detailModalInfo.type} id={detailModalInfo.id} />
      )}
    </Modal>
  );
};

export default DetailModal;
