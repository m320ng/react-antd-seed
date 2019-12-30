import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'antd';
import reducer from './shared_component.reducer';

const SharedComponent = () => {
  const confirm = useSelector(({ shared_component }) => shared_component.confirm);
  const content = useSelector(({ shared_component }) => shared_component.content);
  const title = useSelector(({ shared_component }) => shared_component.title);
  const handleOk = useSelector(({ shared_component }) => shared_component.handleOk);
  const handleCancel = useSelector(({ shared_component }) => shared_component.handleCancel);

  return (
    <>
      <Modal title={title} visible={confirm} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
        <p>{content}</p>
      </Modal>
    </>
  );
};

export default SharedComponent;
