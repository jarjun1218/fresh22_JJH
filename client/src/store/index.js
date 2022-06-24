import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    isLogined: false,
    loginAccount: '',
    postStatus: false,
  },
  getters: {
  },
  mutations: {
    Logined(state) {
      state.isLogined = true
    },
    Logout(state) {
      state.isLogined = false
    },
    Post(state) {
      state.postStatus = !state.postStatus
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: 
    [createPersistedState()]
})
