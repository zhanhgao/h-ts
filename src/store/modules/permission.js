import { getMunu } from '@/api/api'
import { currencyRoutes } from '@/router'
import store from '@/store'

const state = {
  routes: [],
  addRoutes: [],
  permissionObj:[]
}
const resetState = {
  routes: [],
  addRoutes: [],
  permissionObj:[]
}

let array=[];
const mutations = {
  SET_ROUTES(state, payload) {
    state.routes = [...currencyRoutes, ...payload]
    state.addRoutes = payload
  },
  SET_PERMISSION(state, payload) {
    state.permissionObj = payload
  },
  RESET_STATE(state){
    Object.assign(state, resetState)
  }
}
const actions = {
    getAsyncRoutes({ commit }) {
      return new Promise(resolve => {
        getMunu(store.getters.userName).then(res => {
          const routes = res;
          _getPermission(routes);
          commit('SET_ROUTES', routes);
          commit('SET_PERMISSION', array);
          resolve(routes)
        });
      })
    },
    resetState({ commit }) {
      commit('RESET_STATE');
    }
}

function _getPermission(arr){
  arr.forEach(item=>{
    if(item.children&&item.children.length){
      _getPermission(item.children);
    }else{
      if(item.meta&&item.meta.permission){
        array.push( {
            name:item.name,
            permission:item.meta.permission.status,
        })
      }
    }
})
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
