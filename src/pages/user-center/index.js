import React from 'react';
import { Spin, message } from 'antd';
import { connect } from 'dva';

import SearchLayout from 'components/search-layout';

import { userUpdate } from '../../api/user';

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

  submitForm = async (values) => {
    const { code } = await userUpdate(values.gender, values.description);
    if (code === 'A0000') {
      message.success('修改成功');
    } else {
      message.error('修改失败');
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 1000);
  }

  render() {
    const { isLoading } = this.state;
    const {
      isInit,
      id,
      accountName,
      gender,
      description
    } = this.props;
    const data = {
      id,
      accountName,
      gender,
      description
    };
    if (!isInit) {
      return null;
    }
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

function select(state) {
  return {
    isInit: state.user.isInit,
    id: state.user.id,
    accountName: state.user.accountName,
    gender: state.user.gender,
    description: state.user.description
  };
}

export default connect(select)(UserCenter);
