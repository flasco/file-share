import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import { Button } from 'antd';

class Home extends React.Component {

  test = () => {
    console.log('test');
  }

  render() {
    return (
      <React.Fragment>
        <div>Hello</div>
        <Link to={'/test'}>测试</Link>
        <a href={'/'}>jmp</a>
        <Button onClick={this.test}>测试</Button>
      </React.Fragment>
    );
  }
}



function select(state) {
  console.log(state);
  return {}
}

export default connect(select)(Home);