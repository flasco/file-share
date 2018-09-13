
export default {
  namespace: 'user',
  state: {
    list: [],
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.data,
      };
    },
  },
  effects: {
    * fetch(action, { put }) {
      yield put({ type: 'save', data: [1, 2, 3] });
    },
  },
};
