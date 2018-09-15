import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Tabs, message } from 'antd';
import PropTypes from 'prop-types';

import LoginFormWapper from './components/Login';
import RegisterFormWapper from './components/Register';

// import { userLoginCheck, userRegisterCheck } from '../../../../services/user';

class LoginWindow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      visible: false,
    };
    message('test');
  }

  static defaultProps = {
    windowType: 1,
  }

  static propTypes = {
    windowType: PropTypes.number,
  }

  closeLoginPopup = () => {
    this.setState({
      visible: false
    });
  }

  openLoginPopup = () => {
    this.setState({
      visible: true
    });
  }

  setError = (type) => {
    this.setState({
      isError: type,
    });
  }

  loginSubmit = async (values) => {
    this.props.loginSubmit && this.props.loginSubmit(values);
    // let res = await userLoginCheck(values);
    // if (res.flag) {
    //   this.closeLoginWindow();
    //   this.props.userLogin(res.res);
    // } else {
    //   this.setError(true);
    //   message.error('Login Error.');
    // }
  }

  registerSubmit = async (values) => {
    this.props.registerSubmit && this.props.registerSubmit(values);
    // let flag = await userRegisterCheck(values);
    // if (flag) {
    //   this.closeLoginWindow();
    //   message.success('Register Success!');
    //   // 直接登录账号。
    //   this.props.userLogin({
    //     userName: values.userName,
    //     password: values.password,
    //   });
    // } else {
    //   this.setError(true);
    //   message.error('Register Error, please change your userName');
    // }
  }

  render() {
    return (
      <Modal
        width={300}
        visible={this.state.visible}
        onCancel={this.closeLoginPopup}
        footer={null}>
        <Tabs defaultActiveKey={`${this.props.windowType}`} animated={false} >
          <Tabs.TabPane tab="Login" key="1">
            <LoginFormWapper submit={this.loginSubmit} isError={this.state.isError} setError={this.setError} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Register" key="2">
            <RegisterFormWapper submit={this.registerSubmit} isError={this.state.isError} setError={this.setError} />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export function openPopup() {
  let popupHandle;
  return function () {
    if (popupHandle == null) {
      popupHandle = document.createElement('div');
      document.appendChild(popupHandle);
      ReactDOM.render(<LoginWindow />, popupHandle);
    } else {
      ReactDOM.render(<LoginWindow />, popupHandle);
    }
  };
}

export default LoginWindow;
