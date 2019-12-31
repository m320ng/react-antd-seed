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
  Spin,
  Row,
  Col,
  Modal,
  message,
} from 'antd';
import { apiGetUser, apiPostUser, apiPutUser } from '../users.api';
import { camelize } from 'utils/util';

class WriteForm extends React.Component {
  state = {
    detail: {},
    loading: false,
  };

  componentDidMount() {
    console.log(this.props);
    if (this.props.id) {
      this.fetch(this.props.id);
    }
  }

  fetch = id => {
    this.setState({ loading: true });
    apiGetUser(
      id,
      data => {
        console.log('success', data);
        /*
        let fields = {};
        for (let k in data) {
          fields = { ...fields, [k]: { value: data[k] } };
        }
        this.props.form.setFields(fields);
        */
        this.props.form.setFieldsValue(data);
        this.setState({ detail: data, loading: false });
      },
      (e, canceled) => {
        this.setState({ loading: false });
      },
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    //var form = e.target;
    //console.log(form['name'].value);

    //console.log(this.props.form.getFieldsValue(['name', 'account']));
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 수정
        if (this.state.detail.id) {
          values.id = this.state.detail.id;
          apiPostUser(
            values.id,
            values,
            data => {
              console.log('success', data);
              this.setState({ loading: false });
              message.success('수정되었습니다.');
              this.props.onChangeForm('detail', data.id);
            },
            (res, canceled) => {
              console.log('error', res.status);
              console.log('error', res.data);
              if (res.status === 400) {
                if (typeof res.data === 'string') {
                  message.error(res.data);
                }
                if (typeof res.data === 'object') {
                  message.error('수정을 실패하였습니다');
                  for (let k in res.data) {
                    let field = camelize(k);
                    let value = this.props.form.getFieldValue(field);
                    let errors = res.data[k];
                    this.props.form.setFields({
                      [field]: {
                        errors: errors.map(x => new Error(x)),
                        value: value,
                      },
                    });
                  }
                }
              }
              this.setState({ loading: false });
            },
          );
        } else {
          // 등록
          console.log(values);
          this.setState({ loading: true });
          apiPutUser(
            values,
            data => {
              console.log('success', data);
              this.setState({ loading: false });
              message.success('등록되었습니다.');
              this.props.onChangeForm('detail', data.id);
            },
            (res, canceled) => {
              console.log('error', res.status);
              console.log('error', res.data);
              if (res.status === 400) {
                if (typeof res.data === 'string') {
                  message.error(res.data);
                }
                if (typeof res.data === 'object') {
                  message.error('등록을 실패하였습니다');
                  for (let k in res.data) {
                    let field = camelize(k);
                    let value = this.props.form.getFieldValue(field);
                    let errors = res.data[k];
                    this.props.form.setFields({
                      [field]: {
                        errors: errors.map(x => new Error(x)),
                        value: value,
                      },
                    });
                  }
                }
              }
              this.setState({ loading: false });
            },
          );
        }

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

    return (
      <Spin spinning={this.state.loading}>
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
                })(<Input placeholder="이름" />)}
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
                })(<Input placeholder="사번" />)}
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
              <Form.Item {...formItemLayout} label="팀명">
                {getFieldDecorator('teamName', {
                  rules: [],
                })(<Input placeholder="팀명" />)}
              </Form.Item>
            </Col>
          </Row>
          {this.props.type == 'write' && (
            <Row gutter={8}>
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
              <Col span={12}>
                <Form.Item {...formItemLayout} label="비밀번호 확인">
                  {getFieldDecorator('confirmPassword', {
                    rules: [
                      {
                        required: true,
                        message: '비밀번호를 입력해주세요',
                      },
                    ],
                  })(<Input placeholder="비밀번호 확인" />)}
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label="개발자여부">
                {getFieldDecorator('isDeveloper', { valuePropName: 'checked' })(<Switch />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item {...formItemLayout} label="전화번호">
                {getFieldDecorator('phone', {
                  rules: [],
                })(<Input placeholder="전화번호" />)}
              </Form.Item>
            </Col>
          </Row>
          <div style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              {this.props.type == 'write' ? '등록' : '수정'}
            </Button>
            &nbsp;
            {this.props.type == 'edit' ? (
              <Button onClick={x => this.props.onChangeForm('detail', this.props.id)}>취소</Button>
            ) : (
              <Button onClick={x => this.props.onCancel()}>닫기</Button>
            )}
          </div>
        </Form>
      </Spin>
    );
  }
}

const WrappedWriteForm = Form.create({ name: 'validate_other' })(WriteForm);

export default WrappedWriteForm;
