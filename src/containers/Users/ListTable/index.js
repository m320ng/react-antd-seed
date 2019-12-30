import React from 'react';
import { Table, Button, Drawer, Modal, message } from 'antd';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { apiGetUsers } from '../users.api';
import FilterForm from './filterForm';
import DetailModal from './detailModal';
import { writeFormShowAction } from '../users.reducer';

class ListTable extends React.Component {
  state = {
    data: [],
    pagination: { current: 1, pageSize: 15 },
    loading: false,
    sort: {},
    fileters: [],
    selectedRowKeys: [],
    filterFormShown: false,
    detailModalShown: false,
    detailType: '',
    detailId: null,
  };

  constructor(props) {
    super(props);
    this.columns = [
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
        render: (text, row) => <Button onClick={x => this.handleDetail(row)}>자세히</Button>,
      },
    ];
    // 컬럼명 매핑 생략할 경우
    this.columns.forEach(c => (!c.title ? (c.title = c.dataIndex) : c.title));
  }

  componentDidMount() {
    this.fetch();
  }

  handleDetail = row => {
    console.log('detail', row);
    this.setState({
      detailModalShown: true,
      detailType: 'detail',
      detailId: row.id,
    });
  };

  fetch = (params = {}) => {
    console.log('params:', params);

    this.setState({ loading: true });

    apiGetUsers(
      {
        results: 10,
        ...params,
      },
      data => {
        const pagination = { ...this.state.pagination };
        pagination.current = data.page;
        pagination.total = data.total;
        this.setState({
          loading: false,
          data: data.list,
          pagination,
        });
        window.scrollTo(0, 0);
      },
      (e, canceled) => {
        if (canceled) {
          console.log('canceled');
        } else {
          this.setState({
            loading: false,
          });
          console.log(e);
        }
      },
    );
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

  handlerCancelSelected = () => {
    this.setState({
      selectedRowKeys: [],
    });
  };

  handlerFilterFormShow = () => {
    this.setState({
      filterFormShown: true,
    });
  };

  handlerWriteFormShow = () => {
    this.props.writeFormShow(true);
  };

  handlerSelectedDelete = () => {
    if (!this.state.selectedRowKeys.length) {
      message.warning('먼저 선택해주세요.');
      return;
    }
    Modal.confirm({
      content: `${this.state.selectedRowKeys.length}개를 정말 삭제하시겠습니까?`,
      onOk: () => {
        console.log('ok');
      },
    });
  };

  onFilterForm = filters => {
    console.log('onFilterForm');
    this.setState({
      filterFormShown: false,
    });
    console.log(filters);
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

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
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
        <DetailModal visible={this.state.detailModalShown} type={this.state.detailType} id={this.state.detailId} />
        <div style={{ padding: '5px 0' }}>
          <Button onClick={this.handlerWriteFormShow} type="primary" icon="edit">
            등록
          </Button>
          &nbsp;
          <Button onClick={this.handlerFilterFormShow} icon="search">
            검색
          </Button>
          &nbsp;
          <Button icon="delete" onClick={this.handlerSelectedDelete}>
            선택삭제
          </Button>
          {selectedRowKeys.length ? (
            <>
              <span style={{ padding: '2px 4px' }}>{selectedRowKeys.length}개가 선택되었습니다</span>
              <a onClick={this.handlerCancelSelected}>선택취소</a>
            </>
          ) : (
            <React.Fragment />
          )}
        </div>
        <Table
          style={{ maxWidth: 'max-content' }}
          columns={this.columns}
          rowKey={record => record.id}
          rowSelection={rowSelection}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
          scroll={{ x: true }}
        />
      </>
    );
  }
}

const mapDispatchProps = dispatch => ({
  writeFormShow: value => dispatch(writeFormShowAction(value)),
});

export default connect(null, mapDispatchProps)(ListTable);
