import React from 'react';
import { Modal, Tabs, message } from 'antd';
import PropTypes from 'prop-types';

import LoginFormWapper from './components/Login';
import RegisterFormWapper from './components/Register';

class LoginWindow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      visible: false,
    };
  }

  static defaultProps = {
    popupVisible: false,
    windowType: 'login',
    closePopup: () => { },
    loginSubmit: () => { },
    registerSubmit: () => { },
  }

  static propTypes = {
    popupVisible: PropTypes.bool,
    windowType: PropTypes.string,
    closePopup: PropTypes.func,
    loginSubmit: PropTypes.func,
    registerSubmit: PropTypes.func,
  }

  setError = (type) => {
    this.setState({
      isError: type,
    });
  }

  componentWillUnmount() {
    // 避免内存泄漏
    this.setState = () => { };
  }

  loginSubmit = async (values) => {
    const res = await this.props.loginSubmit(values);
    if (res) {
      this.props.closePopup();
    } else {
      this.setError(true);
      message.error('Login Error.');
    }
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
    const res = await this.props.registerSubmit(values);
    if (res) {
      this.props.closePopup();
    } else {
      this.setError(true);
      message.error('Register Error.');
    }
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
    const { popupVisible, closePopup, windowType } = this.props;
    return (
      <Modal
        width={350}
        destroyOnClose
        maskClosable={false}
        visible={popupVisible}
        onCancel={closePopup}
        footer={null}>
        <Tabs defaultActiveKey={windowType} animated={false} >
          <Tabs.TabPane tab="Login" key="login">
            <LoginFormWapper submit={this.loginSubmit} isError={this.state.isError} setError={this.setError} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Register" key="register">
            <RegisterFormWapper submit={this.registerSubmit} isError={this.state.isError} setError={this.setError} />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default LoginWindow;
