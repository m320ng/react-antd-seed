import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button, Form, Input, Icon, Drawer } from 'antd';
import { SideSheet, Paragraph } from 'evergreen-ui';
import { Button as EverGreenButton } from 'evergreen-ui';
import Moment from 'react-moment';
import { produce } from 'immer';
import { fetchGet, isCancel } from '../../../utils/fetch';
import FilterForm from './filterForm';

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
    sorter: true,
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
  const [listState, setListState] = useState({
    data: [],
    pagination: { current: 1, pageSize: 20 },
    loading: false,
  });

  const [filterFormShown, setFilterFormShown] = useState(false);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = (params = {}) => {
    console.log('params:', params);

    setListState(
      produce(listState, draft => {
        draft.loading = true;
      }),
    );

    console.log('listState', listState);

    fetchGet('api/users', {
      results: 10,
      ...params,
    })
      .then(res => {
        const data = res.data;
        console.log('listState', listState);
        setListState(prevState =>
          produce(prevState, draft => {
            console.log('listState', prevState);
            draft.loading = false;
            draft.data = data.list;
            draft.pagination.current = data.page;
            draft.pagination.total = data.total;
          }),
        );
        window.scrollTo(0, 0);
      })
      .catch(e => {
        if (isCancel(e)) {
          console.log('canceled');
        } else {
          setListState(prevState =>
            produce(prevState, draft => {
              draft.loading = false;
            }),
          );
          console.log(e);
        }
      });
  };

  const handleTableChange = useCallback((pagination, filters, sorter) => {
    console.log('pagination', pagination);
    console.log('filters', filters);

    const sort = { ascend: 'asc', descend: 'desc' };
    fetch({
      page: pagination.current,
      limit: pagination.pageSize,
      'sort.field': sorter.field,
      'sort.order': sort[sorter.order],
      ...filters,
    });
  });

  const handlerFilterForm = useCallback(() => {
    setFilterFormShown(true);
  });

  const onFilterForm = filters => {
    setFilterFormShown(false);
    console.log(filters);
    var pagination = listState.pagination;
    fetch({
      page: pagination.current,
      limit: pagination.pageSize,
      //'sort.field': sorter.field,
      //'sort.order': sort[sorter.order],
      conditions: filters,
    });
  };

  const handelTest = filters => {
    fetch();
  };

  console.log('render ListTable');

  return (
    <>
      <Drawer visible={filterFormShown} width={300} onClose={() => setFilterFormShown(false)}>
        <FilterForm onSearch={onFilterForm} />
      </Drawer>
      <Button onClick={handlerFilterForm} icon="search">
        검색
      </Button>
      <Table
        style={{ maxWidth: 'max-content' }}
        columns={columns}
        rowKey={record => record.id}
        dataSource={listState.data}
        pagination={listState.pagination}
        loading={listState.loading}
        onChange={handleTableChange}
        scroll={{ x: true }}
      />
      <Button onClick={handelTest}>reqwest test</Button>
    </>
  );
};

export default ListTable;
