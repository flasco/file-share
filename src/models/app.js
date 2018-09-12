export default {
  namespace: 'app',

  state: {
    name:'这是app的model',
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
      }
    },
  },

  effects: {
    
  },

  

  subscriptions: {
    
  },

};