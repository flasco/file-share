import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

// 使用按需加载会导致css不会生成，被装在chunk.js里面
const menuGlobal = [
  {
    path: '/',
    models: () => [import('../models/router')], // models可多个
    component: () => import('./home'),
  },
  {
    path: '/search',
    models: () => [import('../models/router')], // models可多个
    component: () => import('./search'),
  },
  {
    path: '/user/center',
    models: () => [import('../models/router')], // models可多个
    component: () => import('./user-center'),
  }
];

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Switch>
        {
          menuGlobal.map(({ path, ...dynamics }, index) => (
            <Route
              key={index}
              path={path}
              exact
              component={dynamic({
                app,
                ...dynamics
              })}
            />
          ))
        }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
