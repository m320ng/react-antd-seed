import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Table, Button, Drawer } from 'antd';
import Moment from 'react-moment';
import { produce } from 'immer';
import { apiGetUsers } from '../users.api';
import FilterForm from '../ListTable/filterForm';
import DetailModal from '../ListTable/detailModal';
import { detailModalShowAction } from '../users.reducer';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    fixed: 'left',
    width: 90,
    sorter: true,
  },
  {
    title: '이름',
    dataIndex: 'name',
    width: 100,
    sorter: true,
  },
  {
    title: '계정',
    dataIndex: 'account',
    width: 100,
  },
  {
    dataIndex: '팀명',
    sorter: true,
    width: 100,
  },
  {
    title: '계정',
    dataIndex: 'account',
    width: 100,
  },
  {
    title: '계정',
    dataIndex: 'account',
    key: 'account',
    width: 100,
  },
  {
    title: '계정',
    dataIndex: 'account',
    width: 100,
  },
  {
    title: '계정',
    dataIndex: 'account',
    width: 100,
  },
  {
    title: '계정',
    dataIndex: 'account',
    width: 100,
  },
  {
    title: '계정',
    dataIndex: 'account',
    width: 100,
  },
  {
    title: '생성일',
    dataIndex: 'created',
    width: 160,
    render: time => time && <Moment format="YYYY-MM-DD HH:mm:ss">{time}</Moment>,
  },
  {
    title: '수정일',
    dataIndex: 'updated',
    width: 160,
    render: time => time && <Moment format="YYYY-MM-DD HH:mm:ss">{time}</Moment>,
  },
  {
    title: 'Action',
    key: 'action',
    width: 100,
    fixed: 'right',
  },
];
// 컬럼명 매핑 생략할 경우
columns.forEach(c => (!c.title ? (c.title = c.dataIndex.replace(/_/g, ' ')) : c.title));

const ListTable = () => {
  const [listState, setListState] = useState({
    data: [],
    pagination: { current: 1, pageSize: 15 },
    fileters: [],
    loading: false,
  });
  const [filterFormShown, setFilterFormShown] = useState(false);

  const dispatch = useDispatch();

  const detailModalShow = payload => {
    dispatch(detailModalShowAction(payload));
  };

  useEffect(() => {
    columns.forEach(x => {
      if (x.key === 'action') {
        x.render = (text, row) => (
          <Button onClick={x => detailModalShow({ visible: true, type: 'detail', id: row.id })}>자세히</Button>
        );
      }
    });

    fetch();
  }, []);

  const fetch = useCallback((params = {}) => {
    console.log('params:', params);

    setListState(prevState =>
      produce(prevState, draft => {
        draft.loading = true;
      }),
    );

    apiGetUsers(
      {
        ...params,
      },
      data => {
        setListState(prevState =>
          produce(prevState, draft => {
            draft.loading = false;
            draft.data = data.list;
            draft.pagination.current = data.page;
            draft.pagination.total = data.total;
          }),
        );
        window.scrollTo(0, 0);
      },
      (res, canceled) => {
        if (canceled) {
          console.log('canceled');
        } else {
          setListState(prevState =>
            produce(prevState, draft => {
              draft.loading = false;
            }),
          );
        }
      },
    );
  }, []);

  const handleTableChange = useCallback((pagination, filters, sorter) => {
    console.log('pagination', pagination);
    console.log('filters', filters);

    const sortmig = { ascend: 'asc', descend: 'desc' };
    const sort = sorter.order
      ? {
          field: sorter.field,
          order: sortmig[sorter.order],
        }
      : '';
    setListState(prevState =>
      produce(prevState, draft => {
        draft.sort = sort;
      }),
    );
    const conditions = { ...listState.filters };
    fetch({
      page: pagination.current,
      limit: pagination.pageSize,
      sort,
      conditions,
    });
  }, []);

  const handlerFilterForm = useCallback(() => {
    setFilterFormShown(true);
  }, []);

  const onFilterForm = filters => {
    setFilterFormShown(false);
    setListState(prevState =>
      produce(prevState, draft => {
        draft.filters = filters;
      }),
    );
    console.log(filters);
    var pagination = listState.pagination;
    fetch({
      page: pagination.current,
      limit: pagination.pageSize,
      sort: listState.sort,
      conditions: filters,
    });
  };

  console.log('render ListTable');

  return (
    <>
      <Drawer visible={filterFormShown} width={300} onClose={() => setFilterFormShown(false)}>
        <FilterForm onSearch={onFilterForm} />
      </Drawer>
      <DetailModal />
      <div style={{ padding: '5px 0' }}>
        <Button onClick={handlerFilterForm} icon="search">
          검색
        </Button>
      </div>
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
    </>
  );
};

export default ListTable;
