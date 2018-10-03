// import { sleep } from 'utils';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'router',
  state: {},
  reducers: {
  },
  effects: {
    * jmp({ payload }, { put }) {
      const { path = '/', params = {} } = payload;
      yield put(routerRedux.push(path, params));
    },
    * goBack({ payload }, { put }) {
      yield put(routerRedux.goBack());
    }
  },
};
