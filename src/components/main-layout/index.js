import React from 'react';
import { Layout } from 'antd';

import UserBoard from '../user-board';

import './index.scss';

const { Header, Content, Footer } = Layout;

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.minHeight = document.body.clientHeight - 134;
  }
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo">
            <span>File Share</span>
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

export default MainLayout;
