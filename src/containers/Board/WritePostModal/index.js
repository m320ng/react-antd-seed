import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Input, Icon, Upload } from 'antd';

import {
  handleModalCancelAction,
  postPostsAction,
  onChangeTitleAction,
  onChangeTextAction,
  onChangeAddPhotoAction,
  onChangeDelPhotoAction,
} from '../board.reducer';

const WritePostModal = () => {
  const modalVisible = useSelector(({ board }) => board.modalVisible);
  const modalLoading = useSelector(({ board }) => board.modalLoading);
  const title = useSelector(({ board }) => board.postForm.title);
  const text = useSelector(({ board }) => board.postForm.text);
  const photo = useSelector(({ board }) => board.postForm.photo);

  const dispatch = useDispatch();
  const postPosts = () => dispatch(postPostsAction());
  const handleModalCancel = () => dispatch(handleModalCancelAction());
  const onChangeTitle = e => dispatch(onChangeTitleAction(e.target.value));
  const onChangeText = e => dispatch(onChangeTextAction(e.target.value));
  const onChangeAddPhoto = file => {
    dispatch(onChangeAddPhotoAction(file));
    return false;
  };
  const onChangeDelPhoto = () => dispatch(onChangeDelPhotoAction());

  return (
    <Modal
      title="Write a Post"
      visible={modalVisible}
      onOk={postPosts}
      confirmLoading={modalLoading}
      onCancel={handleModalCancel}
    >
      <div style={{ marginBottom: 16 }}>
        <Input placeholder="Title" onChange={onChangeTitle} value={title} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input.TextArea rows={4} placeholder="Write some text..." onChange={onChangeText} value={text} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Upload onRemove={onChangeDelPhoto} beforeUpload={onChangeAddPhoto} fileList={photo} accept="image/*">
          <Button>
            <Icon type="upload" /> Select a Photo
          </Button>
        </Upload>
      </div>
    </Modal>
  );
};

export default WritePostModal;
