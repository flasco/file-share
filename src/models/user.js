// import { sleep } from 'utils';

export default {
  namespace: 'user',
  state: {
    isLogin: false,
  },
  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    * login({ payload }, { put }) {
      yield put({ type: 'updateState', payload });
    },
    * register({ payload }, { put }) {
      yield put({ type: 'updateState', payload });
    },
  },
};
