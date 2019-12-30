import React from 'react';
import { Input, Button } from 'antd';
import { useForm } from 'react-hook-form';

const Example = () => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="ant-form-item-control has-error">
        <input
          className="ant-input antd-input"
          name="email"
          ref={register({
            required: 'Required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address',
            },
          })}
        />
        {errors.email && <div className="ant-form-explain">{errors.email.message}</div>}
      </div>

      <input
        className="ant-input antd-input"
        name="username"
        ref={register({
          validate: value => value !== 'admin' || 'Nice try!',
        })}
      />
      {errors.username && <div className="ant-form-explain">{errors.username.message}</div>}

      <button className="ant-btn ant-btn-submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Example;
