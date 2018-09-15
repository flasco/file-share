import React from 'react';
import { Link } from 'dva/router';
import './index.scss';

class UserPanel extends React.Component {
  render() {
    const { needShow, onMouseLeave, onMouseEnter, avatar, accountName, userQuit } = this.props;
    return (
      <div
        className="userboard-container"
        style={{ visibility: !needShow ? 'hidden' : false }}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}>
        <div
          className="userboard-container-inner"
          style={{ visibility: !needShow ? 'hidden' : false }}>
          <img src={avatar} className="userboard-header" alt={accountName} />

          <div className="userboard-first-right" style={{ float: 'left', lineHeight: 'normal' }}>
            <p style={{ marginTop: 14, }}>
              <span className="userboard-name">{accountName}</span><span style={{ fontSize: 12, color: '#93999f', marginLeft: 8 }}>{`Lv.${5}`}</span>
            </p>
            <p style={{ marginTop: 14, fontSize: 12, color: '#93999f' }}>{`积分: ${400}`}</p>
          </div>
          <ul className="userboard-items">
            <li><Link key="info" to={{ pathname: '/user/info' }}>个人中心</Link></li>
            <li><Link key="file" to={{ pathname: '/user/file' }}>文件管理</Link></li>
          </ul>
          <a className="userboard-quit" onClick={userQuit}>安全退出</a>
        </div>
      </div>
    );
  }
}

export default UserPanel;
