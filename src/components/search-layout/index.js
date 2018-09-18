import React from 'react';
import { Layout, Input } from 'antd';
import assets from 'assets';

import UserBoard from '../user-board';

import styles from './index.module.scss';

const { Header, Content, Footer } = Layout;

class SearchLayout extends React.Component {
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
  render() {
    const { keyword, onSearch, children, showSearch } = this.props;
    return (
      <Layout>
        <Header className={styles.layoutHeader}>
          <div className={`${styles.logo} ${showSearch ? styles.logo_search : false}`}>
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

export default SearchLayout;
