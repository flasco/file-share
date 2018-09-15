import React from 'react';
import { Input, Button } from 'antd';
import { connect } from 'dva';
import assets from 'assets';
import MainLayout from 'components/main-layout';

import './index.scss';

class Home extends React.Component {
  state = {
    input: ''
  }
  onChangeInput = (e) => {
    this.setState({ input: e.target.value });
  }

  onSearch = () => {
    const keyword = encodeURIComponent(this.state.input);
    this.props.dispatch({
      type: 'router/jmp',
      payload: {
        path: `/search?q=${keyword}`
      }
    });
  }

  render() {
    return (
      <MainLayout>
        <div className={'logo-container'}>
          <img src={assets.logo} alt={'logo'} />
        </div>
        <div className={'home-search-container'}>
          <div>
            <Input
              autoFocus
              size={'large'}
              className={'search-input'}
              value={this.state.input}
              onPressEnter={this.onSearch}
              onChange={this.onChangeInput}
            />
            <Button type="primary" onClick={this.onSearch}>搜索</Button>
          </div>
        </div>

      </MainLayout>
    );
  }
}

function select() {
  return {};
}

export default connect(select)(Home);
