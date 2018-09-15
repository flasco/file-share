import React from 'react';
import { Layout, Input } from 'antd';
import assets from 'assets';

import UserBoard from '../user-board';

import './index.scss';

const { Header, Content, Footer } = Layout;

class SearchLayout extends React.Component {
  constructor(props) {
    super(props);
    const tempHeight = document.body.clientHeight - 134;
    this.minHeight = tempHeight < 538 ? 538 : tempHeight;
  }
  render() {
    return (
      <Layout className="layout">
        <Header className={'main-layout-header'}>
          <div className="logo">
            <img src={assets.logo2} alt={'file share'} style={{ height: 40, marginRight: 8 }} />
            <Input.Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{ width: 440 }}
            />
          </div>
          <UserBoard />
        </Header>
        <Content style={{ padding: '0 50px', minHeight: `${this.minHeight}px` }}>
          {this.props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by flasco
        </Footer>
      </Layout>
    );
  }
}

export default SearchLayout;