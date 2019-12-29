import React from 'react';
import { Table, Button, Drawer } from 'antd';
import Moment from 'react-moment';
import { fetchGet, isCancel } from '../../../utils/fetch';
import FilterForm from './filterForm';

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
    render: () => <Button>Delete</Button>,
  },
];

class ListTable extends React.Component {
  state = {
    data: [],
    pagination: { current: 1, pageSize: 20 },
    loading: false,
    sort: {},
    fileters: [],
    filterFormShown: false,
    selectedRowKeys: [],
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = (params = {}) => {
    console.log('params:', params);

    this.setState({ loading: true });

    fetchGet('api/users', {
      results: 10,
      ...params,
    })
      .then(res => {
        const data = res.data;
        const pagination = { ...this.state.pagination };
        pagination.current = data.page;
        pagination.total = data.total;
        this.setState({
          loading: false,
          data: data.list,
          pagination,
        });
        window.scrollTo(0, 0);
      })
      .catch(e => {
        if (isCancel(e)) {
          console.log('canceled');
        } else {
          this.setState({
            loading: false,
          });
          console.log(e);
        }
      });
  };

  handleTableChange = (pagination, filters, sorter) => {
    console.log('pagination', pagination);
    console.log('filters', filters);

    const sortmig = { ascend: 'asc', descend: 'desc' };
    const sort = sorter.order
      ? {
          field: sorter.field,
          order: sortmig[sorter.order],
        }
      : '';
    console.log(sorter);
    console.log(sortmig[sorter.order]);
    console.log(sort);
    this.setState({
      sort: sort,
    });
    const conditions = { ...this.state.filters };
    this.fetch({
      page: pagination.current,
      limit: pagination.pageSize,
      sort,
      conditions,
    });
  };

  handlerFilterForm = () => {
    this.setState({
      filterFormShown: true,
    });
  };

  onFilterForm = filters => {
    console.log('onFilterForm');
    this.setState({
      filterFormShown: false,
    });
    console.log(filters);
    var pagination = { ...this.state.pagination };
    this.setState({
      filters: filters,
    });
    this.fetch({
      page: this.state.pagination.current,
      limit: this.state.pagination.pageSize,
      sort: this.state.sort,
      conditions: filters,
    });
  };

  onFilterFormClose = () => {
    this.setState({
      filterFormShown: false,
    });
  };
  /*
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(this);
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.account === 'test', // Column configuration not to be checked
      name: record.name,
    }),
  };
  */

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  handelTest = filters => {
    fetch();
  };

  render() {
    console.log('render ListTable');
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <>
        <Drawer visible={this.state.filterFormShown} width={300} onClose={this.onFilterFormClose}>
          <FilterForm onSearch={this.onFilterForm} />
        </Drawer>
        <Button onClick={this.handlerFilterForm} icon="search">
          검색
        </Button>
        <Button icon="delete">선택삭제</Button>
        {selectedRowKeys.length ? (
          <>
            {selectedRowKeys.length}개가 선택되었습니다
            <a>선택취소</a>
          </>
        ) : (
          <React.Fragment />
        )}
        <Table
          style={{ maxWidth: 'max-content' }}
          columns={columns}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
          scroll={{ x: true }}
        />
        <Button onClick={this.handelTest}>reqwest test</Button>
      </>
    );
  }
}

export default ListTable;
