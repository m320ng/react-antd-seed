import React, { useState } from 'react';
import { Checkbox, Input, DatePicker, Typography, Button, Icon } from 'antd';
import produce from 'immer';

const { Title } = Typography;

const Row = props => <div style={{ padding: '5px 0' }}>{props.children}</div>;

const FilterForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({});

  const checkFilter = (name, checked, op = 'eq') => {
    setFilters(
      produce(filters, draft => {
        const oplist = typeof op === 'string' ? [op] : op;
        for (let op of oplist) {
          const key = `${name}_${op}`;
          if (!draft[key]) draft[key] = { field: name };
          draft[key].op = checked ? op : false;
        }
      }),
    );
  };
  const filterValue = (name, value, op = 'eq') => {
    console.log(name, value);
    const key = `${name}_${op}`;
    setFilters(
      produce(filters, draft => {
        if (!draft[key]) draft[key] = { field: name };
        draft[key].value = value;
      }),
    );
  };
  const onSearchClick = () => {
    const f = Object.values(filters).filter(x => x.op && x.value);
    console.log('f', f);
    onSearch(f);
  };

  return (
    <div style={{ padding: '0' }}>
      <div>
        <Title level={4}>
          <Icon type="setting" />
          검색조건
        </Title>
      </div>
      <Row>
        <Checkbox onChange={e => checkFilter('created', e.target.checked, ['gt', 'lt'])}>등록일자</Checkbox>
        <DatePicker placeholder="시작일" onChange={(date, dateStr) => filterValue('created', dateStr, 'gt')} />
        <DatePicker placeholder="종료일" onChange={(date, dateStr) => filterValue('created', dateStr, 'lt')} />
      </Row>
      <Row>
        <Checkbox onChange={e => checkFilter('name', e.target.checked, 'cn')}>이름</Checkbox>
        <Input onChange={e => filterValue('name', e.target.value, 'cn')} />
      </Row>
      <Row>
        <Checkbox onChange={e => checkFilter('account', e.target.checked, 'cn')}>계정</Checkbox>
        <Input onChange={e => filterValue('account', e.target.value, 'cn')} />
      </Row>
      <Row>
        <Button icon="search" onClick={onSearchClick}>
          검색
        </Button>
      </Row>
    </div>
  );
};

export default FilterForm;
