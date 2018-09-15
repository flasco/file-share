import React from 'react';


import './index.scss';

class UserBoard extends React.Component {

  login = () => {
    console.log('login!');
  }

  register = () => {
    console.log('register!');
  }


  render() {
    return (
      <ul className={'user-board-container'}>
        <li onClick={this.login}>登录</li>
        <li onClick={this.register}>注册</li>
      </ul>
    );
  }
}

export default UserBoard;
