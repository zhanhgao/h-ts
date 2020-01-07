import { login,getMunu } from '@/api/api'
import { Message } from 'element-ui'
import router, { resetRouter } from '@/router'

const state = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '', // 认证凭证'
  userName: localStorage.getItem('username') ? localStorage.getItem('username') : '', // 认证凭证'
  roles: [],
}
const mutations = {
  SET_TOKEN(state, val) {
    state.token = val
    localStorage.setItem('token', val)
  },
  DEL_TOKEN(state) {
    state.token = ''
    state.userName = ''
    state.roles = ''
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  },
  SET_ROLES(state, payload) {
    state.roles = payload
  },
  SET_NAME(state, payload) {
    state.userName = payload
    localStorage.setItem('username', payload)
  }
}
const actions = {
  // user login
  _login({ commit }, formdatas) {
    
    return new Promise((resolve, reject) => {
      login(formdatas)
        .then(res => {
          if (res.status !== 1) {
              Message.success({ message: res.message||'登录成功', duration: 1000 });
              commit('SET_TOKEN', res.data.token);
              commit('SET_NAME', res.data.user.username);
              resolve(res);
          }else{
              Message.error(res.errorMsg);
              reject(res)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  loginOut({ commit }) {
    commit('DEL_TOKEN')
    resetRouter()
    router.push({
      path: '/login',
      query: {
        redirect: router.currentRoute.fullPath
      }
    })
  },
  _getMenu(){
    return new Promise((resolve) => {
      getMunu().then(res=>{
        resolve(res);
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
