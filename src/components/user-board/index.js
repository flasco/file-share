import React from 'react';
import { connect } from 'dva';
import { Avatar } from 'antd';

import { sleep } from 'utils';

import LoginPopup from './components/login-popup';
import UserPanel from './components/user-panel';

import './index.scss';

class UserBoard extends React.Component {
  state = {
    visible: false,
    panelShow: false,
    type: 'login' // login - 登录，register - 注册
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

  userQuit = () => {
    this.props.dispatch({
      type: 'user/logout',
    });
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

  onMouseEnter = () => {
    this.setState({
      panelShow: true
    });
  }

  onMouseLeave = () => {
    this.setState({
      panelShow: false
    });
  }

  renderUser = () => {
    return (
      <div style={{ position: 'relative', height: '100%', float: 'right' }}>
        <div
          className={'user-board-container'}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}>
          <Avatar
            icon="user"
            size="large"
            style={{ margin: '0 15px' }}
            src={this.props.avatar} />
        </div>
        <UserPanel
          accountName={this.props.accountName}
          avatar={this.props.avatar}
          userQuit={this.userQuit}
          needShow={this.state.panelShow}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave} />

      </div>

    );
  }

  render() {
    return (
      this.props.isLogin ? this.renderUser() : this.renderLogin()
    );
  }
}

function select(state) {
  if (state.user == null) return {};
  return {
    isLogin: state.user.isLogin,
    avatar: state.user.avatar,
    accountName: state.user.accountName
    // registerLoading: state.loading.effects['user/register'],
  };
}

export default connect(select)(UserBoard);
