import React from 'react';
import { Spin } from 'antd';

import SearchLayout from 'components/search-layout';

import ConfigForm from './components/config-form';

class UserCenter extends React.Component {
  state = {
    isLoading: true,
    data: {
      id: '1001',
      accountName: 'akari',
      gender: '2',
      description: '写一些事情，有关于你'
    }
  }

  submitForm = (data) => {
    console.log(data);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 1000);
  }

  render() {
    const { isLoading, data } = this.state;
    return (
      <SearchLayout
        withWhiteBoard
        showSearch={false}>
        <h2 style={{ textAlign: 'center' }}>个人中心</h2>
        <Spin spinning={isLoading}>
          <ConfigForm
            data={data}
            submit={this.submitForm} />
        </Spin>
      </SearchLayout>
    );
  }
}

export default UserCenter;
