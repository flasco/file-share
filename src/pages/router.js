import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Loadable from 'react-loadable';
import { Spin } from 'antd';
// import { dynamic } from 'dva/dynamic';

import home from './home';

// 使用按需加载会导致css不会生成，被装在chunk.js里面
const menuGlobal = [
  {
    path: '/',
    component: home
  },
  {
    path: '/search',
    component: Loadable({
      loader: () => import(/* webpackChunkName: "search" */ './search'),
      loading() {
        return <Spin spinning />;
      }
    })
  },
  {
    path: '/user/center',
    component: Loadable({
      loader: () => import(/* webpackChunkName: "userCenter" */ './user-center'),
      loading() {
        return <Spin spinning />;
      }
    })
  }
];

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {
          menuGlobal.map(({ path, component }, index) => (
            <Route
              key={index}
              path={path}
              exact
              component={component}
            />
          ))
        }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
