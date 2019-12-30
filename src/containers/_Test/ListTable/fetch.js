import React, { useEffect, useState, useCallback } from 'react';
import { Table, Button } from 'antd';
import { fetchGet, isCancel } from '../../../utils/fetch';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

const ListTable = () => {
  const [state, setState] = useState({
    data: [],
    pagination: {},
    loading: false,
  });

  useEffect(() => {
    fetch();
  }, []);

  const handleTableChange = useCallback((pagination, filters, sorter) => {
    const pager = { ...state.pagination };
    pager.current = pagination.current;
    setState({
      ...state,
      pagination: pager,
    });
    fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  });

  const handelTest = () => {
    fetch();
  };

  const fetch = useCallback((params = {}) => {
    console.log('params:', params);
    setState({
      ...state,
      loading: true,
    });

    fetchGet('https://randomuser.me/api', {
      results: 10,
      ...params,
    })
      .then(res => {
        const data = res.data;
        const pager = { ...state.pagination };
        // Read total count from server
        //pagination.total = data.totalCount;
        pager.total = 200;
        setState({
          ...state,
          loading: false,
          data: data.results,
          pagination: pager,
        });
      })
      .catch(e => {
        if (isCancel(e)) {
          console.log('canceled');
        } else {
          setState({
            ...state,
            loading: false,
          });
          console.log(e);
        }
      });
  });

  console.log('render ListTable');

  return (
    <>
      <Table
        columns={columns}
        rowKey={record => record.login.uuid}
        dataSource={state.data}
        pagination={state.pagination}
        loading={state.loading}
        onChange={handleTableChange}
      />
      <Button onClick={handelTest}>reqwest test</Button>
    </>
  );
};

export default ListTable;
