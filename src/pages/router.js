import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

import home from './home';

export const searchPreload = Loadable({
  loader: () => import(/* webpackChunkName: "search" */ './search'),
  loading() {
    return <Spin spinning />;
  }
});

export const userPreLoad = Loadable({
  loader: () => import(/* webpackChunkName: "userCenter" */ './user-center'),
  loading() {
    return <Spin spinning />;
  }
});

export const fileManagePreload = Loadable({
  loader: () => import(/* webpackChunkName: "fileManage" */ './file-manage'),
  loading() {
    return <Spin spinning />;
  }
});

export const fileEditPreload = Loadable({
  loader: () => import(/* webpackChunkName: "fileEdit"  */ './file-edit'),
  loading() {
    return <Spin spinning />;
  }
});

export const searchResultPreload = Loadable({
  loader: () => import(/* webpackChunkName: "searchResult"  */ './search-result'),
  loading() {
    return <Spin spinning />;
  }
});

// 使用按需加载会导致css不会生成，被装在chunk.js里面
const routerMap = [
  {
    path: '/',
    component: home
  },
  {
    path: '/search',
    component: searchPreload
  },
  {
    path: '/user/center',
    component: userPreLoad
  },
  {
    path: '/user/file',
    component: fileManagePreload
  },
  {
    path: '/file/edit/:id',
    component: fileEditPreload
  },
  {
    path: '/file/create',
    component: fileEditPreload
  },
  {
    path: '/file/:id',
    component: searchResultPreload
  },
];

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {
          routerMap.map(({ path, component }, index) => (
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
