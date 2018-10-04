import React, { Component } from 'react';
import { connect } from 'dva';
import { message } from 'antd';

import SearchLayout from 'components/search-layout';

import RightBoard from './components/right-board';
import LeftBoard from './components/left-board';

class SearchResult extends Component {
  onDwnClick = () => {
    message.error('测试！');
  }

  getContent = (datas = '') => {
    console.log(datas);
    return [
      <p>测试</p>,
      <p>测试</p>,
      <p>测试</p>,
    ];
  }
  render() {
    const { avatar, accountName } = this.props;
    const content = this.getContent();
    return (
      <SearchLayout
        showSearch={false}>
        <div style={{ display: 'flex', maxWidth: 1000, margin: '0 auto', marginTop: 30 }}>
          <div style={{ flex: 5, background: '#fff', borderRadius: 6, minHeight: 560 }}>
            <LeftBoard
              title={'代码大全.pdf'}
              content={content} />
          </div>
          <div style={{ flex: 2, marginLeft: 14 }}>
            <RightBoard
              avatar={avatar}
              accountName={accountName}
              onClick={this.onDwnClick}
              isPayed={false}
              description={'这里是一些上传者关于本资源的介绍，就像这样啦~'}
              needPoints={'5'} />
          </div>
        </div>
      </SearchLayout>
    );
  }
}

function select(state) {
  return {
    avatar: state.user.avatar,
    accountName: state.user.accountName
  };
}

export default connect(select)(SearchResult);
