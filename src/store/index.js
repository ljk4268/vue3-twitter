import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      user: null
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    }
  }
})

export default store