import React, { useState } from 'react';
import { Checkbox, Input, Typography, Button, Icon } from 'antd';
import produce from 'immer';

const { Title } = Typography;

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

const Row = props => <div style={{ padding: '5px 0' }}>{props.children}</div>;

const FilterForm = ({ onSearch }) => {
  const [filters, setFilters] = useState({});

  const checkFilter = (name, checked, op = 'eq') => {
    const key = `${name}_${op}`;
    setFilters(
      produce(filters, draft => {
        if (!draft[key]) draft[key] = { field: name };
        draft[key].op = checked ? op : false;
      }),
    );
  };
  const inputValue = (name, value, op = 'eq') => {
    const key = `${name}_${op}`;
    setFilters(
      produce(filters, draft => {
        if (!draft[key]) draft[key] = { field: name };
        draft[key].value = value;
      }),
    );
  };
  const onSearchClick = () => {
    //console.log('filters', filters);
    const f = Object.values(filters).filter(x => x.op && x.value);
    onSearch(f);
  };

  const onCheckbox = (e, op) => checkFilter(e.target.name, e.target.checked, op);
  const onInputChange = (e, op) => inputValue(e.target.name, e.target.value, op);

  console.log('filters', filters);

  return (
    <div style={{ padding: '10px' }}>
      <div>
        <Title level={4}>
          <Icon type="setting" />
          검색조건
        </Title>
      </div>
      <Row>
        <Checkbox name="name" onChange={e => onCheckbox(e, 'cn')}>
          이름
        </Checkbox>
        <Input name="name" onChange={e => onInputChange(e, 'cn')} />
      </Row>
      <Row>
        <Checkbox name="account" onChange={e => onCheckbox(e, 'cn')}>
          계정
        </Checkbox>
        <Input name="account" onChange={e => onInputChange(e, 'cn')} />
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
