import React from 'react';
import { Layout, Input } from 'antd';
import { connect } from 'dva';

import assets from 'assets';

import UserBoard from '../user-board';

import styles from './index.module.scss';

const { Header, Content, Footer } = Layout;

class SearchLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    const tempHeight = document.body.clientHeight - 134;
    this.minHeight = tempHeight < 538 ? 538 : tempHeight;
  }

  static defaultProps = {
    keyword: '',
    onSearch: () => { },
    showSearch: true
  }

  jmpIndex = () => {
    !this.props.showSearch && this.props.dispatch({
      type: 'router/jmp',
      payload: {
        path: '/'
      }
    });
  }

  render() {
    const { keyword, onSearch, children, showSearch } = this.props;
    return (
      <Layout>
        <Header className={styles.layoutHeader}>
          <div
            onClick={this.jmpIndex}
            className={`${styles.logo} ${showSearch ? styles.logo_search : styles.logo_no_search}`}>
            <img src={assets.logo2} alt={'file share'} />
            {showSearch ? <Input.Search
              defaultValue={keyword}
              placeholder="input search text"
              onSearch={onSearch}
              style={{ width: 440 }}
            /> : <span>File Share</span>}
          </div>
          <UserBoard />
        </Header>
        <Content style={{ padding: '0 50px', minHeight: `${this.minHeight}px` }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by flasco
        </Footer>
      </Layout>
    );
  }
}

function select() {
  return {};
}

export default connect(select)(SearchLayout);
