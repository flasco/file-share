import React from 'react';
import { Spin } from 'antd';

import SearchLayout from 'components/search-layout';

import ConfigForm from './components/config-form';

class UserCenter extends React.Component {
  state = {
    isLoading: false,
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

  render() {
    const { isLoading, data } = this.state;
    return (
      <SearchLayout showSearch={false}>
        <div style={{ background: '#fff', maxWidth: 1000, margin: '0 auto', marginTop: 30, paddingTop: 30, borderRadius: 6 }}>
          <h2 style={{ textAlign: 'center' }}>个人中心</h2>
          <Spin spinning={isLoading}>
            <ConfigForm
              data={data}
              submit={this.submitForm} />
          </Spin>
        </div>

      </SearchLayout>
    );
  }
}

export default UserCenter;
