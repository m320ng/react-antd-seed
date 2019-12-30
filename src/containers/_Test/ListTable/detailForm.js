import React, { useState, useEffect } from 'react';
import { Skeleton, Button, Descriptions } from 'antd';
import { apiGetUser } from '../users.api';

const DetailForm = ({ id, onChangeForm }) => {
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(id);
  }, [id]);

  const fetch = id => {
    setLoading(true);
    apiGetUser(
      id,
      data => {
        console.log(data);
        setDetail(data);
        setLoading(false);
      },
      (e, canceled) => {
        setLoading(false);
      },
    );
  };

  return (
    <div style={{ background: '#ffffff' }}>
      <Skeleton active loading={loading}>
        <Descriptions title="" bordered>
          <Descriptions.Item label="ID">{detail.id}</Descriptions.Item>
          <Descriptions.Item label="사번">{detail.employeeNo}</Descriptions.Item>
          <Descriptions.Item label="아이디">{detail.account}</Descriptions.Item>
          <Descriptions.Item label="개발자여부">{detail.isDeveloper}</Descriptions.Item>
          <Descriptions.Item label="전화번호">{detail.phone}</Descriptions.Item>
        </Descriptions>
        <div style={{ textAlign: 'right' }}>
          <Button onClick={x => onChangeForm('edit', id)}>수정</Button>
        </div>
      </Skeleton>
    </div>
  );
};

export default DetailForm;
