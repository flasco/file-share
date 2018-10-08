// import { sleep } from 'utils';
import akari from '../assets/akari.jpg';

import { loginCheck } from '../api';

const initialState = {
  isLogin: false,
  isInit: false,
  avatar: akari,
  points: 0,
  id: -1,
  description: '',
  gender: '',
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
    * appInit(action, { call, put }) {
      let { data } = yield call(loginCheck);
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            isInit: true,
            isLogin: true,
            accountName: data.userName,
            id: data.id,
            gender: data.gender,
            description: data.introduce,
            points: data.points
          }
        });
      } else {
        yield put({
          type: 'updateState',
          payload: {
            isInit: true
          }
        });
      }
    },
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
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'appInit' });
    },
  },
};
