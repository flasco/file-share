import React from 'react';
import { Layout } from 'antd';
import './index.scss';

const { Header, Content, Footer } = Layout;

class MainLayout extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
        </Header>
        <Content style={{ padding: '0 50px', minHeight: '400px' }}>
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
