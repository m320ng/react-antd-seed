import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Input, Icon, Upload } from 'antd';

import EditForm from './editForm';
import DetailForm from './detailForm';

const DetailModal = props => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('');
  const [id, setId] = useState(null);
  const onCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    setVisible(props.visible);
    setType(props.type);
    setId(props.id);
  }, [props]);

  const onChangeForm = (type, id) => {
    setType(type);
    setId(id);
  };

  return (
    <Modal
      title={props.title ? props.title : '회원 정보'}
      visible={visible}
      onCancel={onCancel}
      footer={false}
      width="100vh"
    >
      {type == 'detail' ? (
        <DetailForm onChangeForm={onChangeForm} id={id} />
      ) : (
        <EditForm onChangeForm={onChangeForm} id={id} />
      )}
    </Modal>
  );
};

export default DetailModal;
