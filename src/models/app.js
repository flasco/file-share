export default {
  namespace: 'app',

  state: {
    user: {
      name: '',
      points: 0,
    }
  },

  reducers: {
    changeState(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
  },

  effects: {

  },

  subscriptions: {

  },

};
