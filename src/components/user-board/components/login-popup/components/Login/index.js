
import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';

import './index.scss';

class LoginForm extends React.Component {
  state = {
    btnLoading: false
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.isError) {
      this.props.setError(false);
      return {
        btnLoading: false
      };
    }
    return null;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.submit(values);
        this.setState({
          btnLoading: true
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('accountName', {
            validateTrigger: 'onBlur',
            initialValue: '',
            rules: [{ required: true, message: 'make sure that accountName is Prescribed.', max: 10, min: 3 }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="AccountName" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            validateTrigger: 'onBlur',
            initialValue: '',
            rules: [{ required: true, message: 'make sure that password is Prescribed.', max: 12, min: 6 }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item style={{ marginBottom: 12 }}>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.btnLoading}>
            Log in
          </Button>
        </Form.Item>
        <a className="login-form-forgot" onClick={() => message.warning('Please contact the administrator. QQ: 82415327.')}>Forgot password</a>
      </Form>
    );
  }
}

const LoginFormWapper = Form.create()(LoginForm);

export default LoginFormWapper;
