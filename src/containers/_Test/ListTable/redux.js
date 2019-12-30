import React, { useState } from 'react';
import { Table, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import urljoin from 'url-join';
import Moment from 'react-moment';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    width: 90,
  },
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
    width: 100,
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '계정',
    dataIndex: 'account',
    key: 'account',
    width: 100,
    render: text => <pre style={{ marginBottom: 0, maxHeight: 100 }}>{text}</pre>,
  },
  {
    title: '계정',
    dataIndex: 'account',
    key: 'account',
    width: 100,
    render: text => <pre style={{ marginBottom: 0, maxHeight: 100 }}>{text}</pre>,
  },
  {
    title: '계정',
    dataIndex: 'account',
    key: 'account',
    width: 100,
    render: text => <pre style={{ marginBottom: 0, maxHeight: 100 }}>{text}</pre>,
  },
  {
    title: '계정',
    dataIndex: 'account',
    key: 'account',
    width: 100,
    render: text => <pre style={{ marginBottom: 0, maxHeight: 100 }}>{text}</pre>,
  },
  {
    title: '계정',
    dataIndex: 'account',
    key: 'account',
    width: 100,
    render: text => <pre style={{ marginBottom: 0, maxHeight: 100 }}>{text}</pre>,
  },
  {
    title: '계정',
    dataIndex: 'account',
    key: 'account',
    width: 100,
    render: text => <pre style={{ marginBottom: 0, maxHeight: 100 }}>{text}</pre>,
  },
  {
    title: '계정',
    dataIndex: 'account',
    key: 'account',
    width: 100,
    render: text => <pre style={{ marginBottom: 0, maxHeight: 100 }}>{text}</pre>,
  },
  {
    title: '계정',
    dataIndex: 'account',
    key: 'account',
    width: 100,
    render: text => <pre style={{ marginBottom: 0, maxHeight: 100 }}>{text}</pre>,
  },
  {
    title: '생성일',
    dataIndex: 'created',
    key: 'created',
    width: 160,
    render: time => time && <Moment format="YYYY-MM-DD HH:mm:ss">{time}</Moment>,
  },
  {
    title: '수정일',
    dataIndex: 'updated',
    key: 'updated',
    width: 160,
    render: time => time && <Moment format="YYYY-MM-DD HH:mm:ss">{time}</Moment>,
  },
  {
    title: 'Action',
    key: 'action',
    width: 100,
    fixed: 'right',
    render: () => <Button>Delete</Button>,
  },
];

const ListTable = () => {
  const pagingList = useSelector(({ users }) => users.pagingList);
  const loading = useSelector(({ users }) => users.loading);

  console.log('render ListTable');
  return (
    <>
      <Table
        style={{ maxWidth: 'max-content', background: '#ffffff' }}
        dataSource={pagingList.list}
        columns={columns}
        loading={loading}
        pagination={false}
        rowSelection={{}}
        scroll={{ x: true }}
        bordered
      />
    </>
  );
};

export default React.memo(ListTable);
