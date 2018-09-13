import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

// 使用按需加载会导致css不会生成，被装在chunk.js里面
const menuGlobal = [
  {
    path: '/',
    models: () => [import('../models/user')], //models可多个
    component: () => import('./Home'),
  },
  {
    path: '/test',
    // models: () => [import('./models/aaa')], //models可多个
    component: () => import('./Home'),
  },
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