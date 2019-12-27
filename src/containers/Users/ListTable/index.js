import React from 'react';
import { Table, Avatar } from 'antd';
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

const ListTable = ({ postList, loading }) => {
  return (
    <>
      <div style={{ background: '#ffffff' }}>
        <Table dataSource={postList} columns={columns} loading={loading} pagination={false} bordered={true} />
      </div>
    </>
  );
};

export default ListTable;
