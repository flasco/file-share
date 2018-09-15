
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class RegisterForm extends React.Component {
  state = {
    confirmDirty: false,
    btnLoading: false,
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
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.isError) {
  //     this.setState({ buttonLoading: false });
  //     this.props.setError(false);
  //   }
  // }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submit(values);
        this.setState({
          btnLoading: true
        });
      }
    });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('accountName', {
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: 'length: [3,10], only number & english letter', max: 10, min: 3, pattern: /^[a-zA-Z_0-9]{3,10}$/g }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="AccountName" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: 'length: [6,12]', max: 12, min: 6 }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item hasFeedback >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" onBlur={this.handleConfirmBlur} placeholder="confirm password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            validateTrigger: 'onBlur',
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" />
          )}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
            rules: [{
              validator: (rule, value, callback) => {
                if (!value) {
                  callback('make sure that you read the agreement :)');
                }
                callback();
              }
            }]
          })(
            <Checkbox>I agree the agreement</Checkbox>
          )}
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.btnLoading}>Register</Button>
        </Form.Item>
      </Form>
    );
  }
}

const RegisterFormWapper = Form.create()(RegisterForm);

export default RegisterFormWapper;
