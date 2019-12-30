import React from 'react';
import {
  Form,
  Input,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';
import { apiGetUser } from '../users.api';

class WriteForm extends React.Component {
  state = {
    detail: { name: 'wefewfew' },
    loading: false,
  };

  componentDidMount() {
    console.log(this.props);
    if (this.props.id) {
      //this.fetch(this.props.id);
    }
  }

  fetch = id => {
    this.setState({ loading: true });
    apiGetUser(
      id,
      data => {
        console.log('success', data);
        this.setState({ detail: data });
        this.setState({ loading: false });
      },
      (e, canceled) => {
        this.setState({ loading: false });
      },
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    console.log(this.state.detail);
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="이름">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '이름을 입력해주세요',
                  },
                ],
                value: this.state.detail.name,
              })(<Input value={this.state.detail.name} placeholder="이름" />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="사번">
              {getFieldDecorator('employeeNo', {
                rules: [
                  {
                    required: true,
                    message: '사번을 입력해주세요',
                  },
                ],
              })(<Input value={this.state.detail.employeeNo} placeholder="사번" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="아이디">
              {getFieldDecorator('account', {
                rules: [
                  {
                    required: true,
                    message: '아이디를 입력해주세요',
                  },
                ],
              })(<Input placeholder="아이디" />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="비밀번호">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '비밀번호를 입력해주세요',
                  },
                ],
              })(<Input placeholder="비밀번호" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item label="개발자여부">
              {getFieldDecorator('isDeveloper', { valuePropName: 'checked' })(<Switch />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...formItemLayout} label="전화번호">
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: '전화번호를 입력해주세요',
                  },
                ],
              })(<Input placeholder="전화번호" />)}
            </Form.Item>
          </Col>
        </Row>
        <div style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    );
  }
}

const WrappedWriteForm = Form.create({ name: 'validate_other' })(WriteForm);

export default WrappedWriteForm;
