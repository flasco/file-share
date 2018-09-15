import React from 'react';
import { connect } from 'dva';
import { Input, Button } from 'antd';

import MainLayout from 'components/main-layout';

import './index.scss';

class Home extends React.Component {
  state = {
    input: ''
  }
  onChangeInput = (e) => {
    this.setState({ userName: e.target.value });
  }

  render() {
    return (
      <MainLayout>
        <div className={'home-search-container'}>
          <div>
            <Input
              autoFocus
              size={'large'}
              className={'search-input'}
              value={this.state.input}
              onChange={this.onChangeInput}
            />
            <Button type="primary">搜索</Button>
          </div>
        </div>

      </MainLayout>
    );
  }
}

function select(state) {
  console.log(state);
  return {};
}

export default connect(select)(Home);
