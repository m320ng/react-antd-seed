import React, { useState } from 'react';
import { Table, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import urljoin from 'url-join';
import Moment from 'react-moment';
import { Resizable } from 'react-resizable';

const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize} draggableOpts={{ enableUserSelectHack: false }}>
      <th {...restProps} />
    </Resizable>
  );
};

const initColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 90,
    fixed: 'left',
  },
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
    width: 100,
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
    render: () => <Button>Delete</Button>,
    fixed: 'right',
  },
];

const ListTable = () => {
  const pagingList = useSelector(({ users }) => users.pagingList);
  const loading = useSelector(({ users }) => users.loading);

  const [columns, setColumns] = useState(initColumns);

  const handleResize = index => (e, { size }) => {
    const nextColumns = [...columns];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };
    setColumns(nextColumns);
  };

  const newColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: column => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  const components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  console.log('render ListTable');
  return (
    <>
      <div className="list-table" style={{ background: '#ffffff' }}>
        <Table
          dataSource={pagingList.list}
          columns={newColumns}
          components={components}
          loading={loading}
          pagination={false}
          rowSelection={{}}
          scroll={{ x: 1000 }}
          bordered
        />
      </div>
    </>
  );
};

export default React.memo(ListTable);
