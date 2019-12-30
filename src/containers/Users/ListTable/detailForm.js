import React, { useState, useEffect } from 'react';
import { Skeleton, Button } from 'antd';
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
        <table>
          <tr>
            <th>ID</th>
            <td>{detail.id}</td>
          </tr>
          <tr>
            <th>이름</th>
            <td>{detail.name}</td>
          </tr>
          <tr>
            <th>아이디</th>
            <td>{detail.account}</td>
          </tr>
        </table>
        <Button onClick={x => onChangeForm('edit', id)}>수정</Button>
      </Skeleton>
    </div>
  );
};

export default DetailForm;
