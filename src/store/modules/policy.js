/*
set sidebar open or close,and some app setting
 */
const state = {
    row: '',
  }
  const mutations = {
    SET_ROW(state, payload) {
      state.row = payload
    }
  }
  export default {
    namespaced: true,
    state,
    mutations
  }
  