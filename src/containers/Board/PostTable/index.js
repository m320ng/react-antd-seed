import React from 'react';
import { Table, Avatar, Pagination } from 'antd';
import { useSelector } from 'react-redux';
import urljoin from 'url-join';
import Moment from 'react-moment';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '계정',
    dataIndex: 'account',
    key: 'account',
    render: text => <pre style={{ marginBottom: 0, maxHeight: 100 }}>{text}</pre>,
  },
  {
    title: 'Photo',
    dataIndex: 'photo',
    key: 'photo',
    render: photo =>
      photo ? (
        <Avatar src={`${urljoin(process.env.REACT_APP_BASE_URL, photo)}`} shape="square" />
      ) : (
        <Avatar icon="file-image" shape="square" />
      ),
  },
  {
    title: '생성일',
    dataIndex: 'created',
    key: 'created',
    render: time => <Moment format="YYYY-MM-DD HH:mm:ss">{time}</Moment>,
  },
  {
    title: '수정일',
    dataIndex: 'updated',
    key: 'updated',
    render: time => <Moment format="YYYY-MM-DD HH:mm:ss">{time}</Moment>,
  },
];

function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <a>이전</a>;
  }
  if (type === 'next') {
    return <a>다음</a>;
  }
  return originalElement;
}

const PostTable = () => {
  const postList = useSelector(({ board }) => board.postList);
  const loading = useSelector(({ board }) => board.loading);

  const page = useSelector(({ board }) => board.page);
  const total = useSelector(({ board }) => board.total);
  console.log('page', page);
  console.log('total', total);

  return (
    <>
      <div style={{ background: '#ffffff' }}>
        <Table dataSource={postList} columns={columns} loading={loading} pagination={false} bordered={true} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Pagination
          current={page}
          total={total}
          itemRender={itemRender}
          style={{ display: 'inline-block', margin: '10px 0px' }}
        />
      </div>
    </>
  );
};

export default PostTable;
