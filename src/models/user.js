// import { sleep } from 'utils';
import akari from '../assets/akari.jpg';

export default {
  namespace: 'user',
  state: {
    isLogin: true,
    avatar: akari,
    accountName: '执墨'
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
