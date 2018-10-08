// import { sleep } from 'utils';
import akari from '../assets/akari.jpg';

const initialState = {
  isLogin: false,
  avatar: akari,
  points: 0,
  accountName: '测试'
};

export default {
  namespace: 'user',
  state: initialState,
  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetState(state) {
      return {
        ...state,
        ...initialState
      };
    }
  },
  effects: {
    * login({ payload }, { put }) {
      yield put({ type: 'updateState', payload });
    },
    * register({ payload }, { put }) {
      yield put({ type: 'updateState', payload });
    },
    * logout(action, { put }) {
      yield put({ type: 'resetState' });
    }
  },
};
