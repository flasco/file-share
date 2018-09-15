import React from 'react';
import { connect } from 'dva';

import LoginPopup from 'components/login-popup';
import { sleep } from 'utils';

import './index.scss';

class UserBoard extends React.Component {
  state = {
    visible: false,
    type: 'login' // 1 - 登录, 2 - 注册
  }
  login = () => {
    this.setState({
      visible: true,
      type: 'login'
    });
  }

  register = () => {
    this.setState({
      visible: true,
      type: 'register'
    });
  }

  closePopup = () => {
    this.setState({
      visible: false
    });
  }

  loginSubmit = async (values) => {
    console.log(values);
    await sleep(1000);
    const res = true;
    res && this.props.dispatch({
      type: 'user/login',
      payload: {
        isLogin: true
      },
    });

    return res;
  }

  registerSubmit = async (values) => {
    console.log(values);
    await sleep(1000);
    const res = true;
    res && this.props.dispatch({
      type: 'user/register',
      payload: {
        isLogin: true
      },
    });

    return res;
  }

  renderLogin = () => {
    return (
      <React.Fragment>
        <ul className={'user-board-container'}>
          <li onClick={this.login}>登录</li>
          <li onClick={this.register}>注册</li>
        </ul>
        <LoginPopup
          windowType={this.state.type}
          closePopup={this.closePopup}
          loginSubmit={this.loginSubmit}
          popupVisible={this.state.visible}
          registerSubmit={this.registerSubmit}
        />
      </React.Fragment>
    );
  }

  renderUser = () => {
    return (
      <div className={'user-board-container'}>登录成功啦~</div>
    );
  }

  render() {
    return (
      this.props.isLogin ? this.renderUser() : this.renderLogin()
    );
  }
}
function select(state) {
  return {
    isLogin: state.user.isLogin,
    // registerLoading: state.loading.effects['user/register'],
  };
}

export default connect(select)(UserBoard);
