import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Button } from 'antd';

import MainLayout from 'components/main-layout';

class Home extends React.Component {
  test = () => {
    console.log('test');
  }

  render() {
    return (
      <MainLayout>
        <div>Hello</div>
        <Link to={'/test'}>测试</Link>
        <a href={'/'}>jmp</a>
        <Button onClick={this.test}>测试</Button>
      </MainLayout>
    );
  }
}



function select(state) {
  console.log(state);
  return {}
}

export default connect(select)(Home);