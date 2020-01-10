import axios from 'axios'
import Qs from 'qs'
import store from '@/store/index11'
import router from '@/router'
import Vue from 'vue'
import { Message,Loading } from 'element-ui'


declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}

const $axios = axios.create({
  // 设置超时时间
  timeout: 30000,
  // 基础url，会在请求url中自动添加前置链接
  baseURL: process.env.VUE_APP_BASE_API
})

Vue.prototype.$http = axios // 并发请求
// 在全局请求和响应拦截器中添加请求状态
let loading:any = null

// 请求拦截器
$axios.interceptors.request.use(
  config => {
    loading = Loading.service({ text: '拼命加载中...' })
    let token = store.getters.token;
    // 写死测试
    token='765dac684a5c614382b2782223f3f4d49dbf7d5d04dd168b6e606e72e6ddd27dff6030c8e5f9a2c4d33b12c4410d20f06ada57f2544747a15c5a3627ab214a319e38240d865d41c5edf33b8997e8aa3dbb4f39f0ac7ecbec69a4776e4c407ead7949ff97877f23e5d3a0b531d4385bae847a93d167bb6c8bc580cb982c1ae42896872d7e4c62cd41';
    if (token) {
      config.headers.Authentication = token // 请求头部添加token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
$axios.interceptors.response.use(
  response => {
    if (loading) {
      loading.close()
    }
    const code = response.status
    if ((code >= 200 && code < 300) || code === 304) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (loading) {
      loading.close()
    }
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回401 清除token信息并跳转到登陆页面
          store.commit('DEL_TOKEN')
          router.replace({
            path: '/login',
          })
          break
        case 404:
          Message.error('网络请求不存在')
          router.replace({
            path: '/error/404',
          })
          break
        default:
          Message.error(error.response.data.errorMsg)
      }
    } else {
      // 请求超时或者网络有问题
      if (error.message.includes('timeout')) {
        Message.error('请求超时！请检查网络是否正常')
      } else {
        Message.error('请求失败，请检查网络是否已连接')
      }
    }
    return Promise.reject(error)
  }
)

// get，post请求方法
export default {
  post(url:string, data:any) {
    return $axios({
      method: 'post',
      url: url,
      data: Qs.stringify(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },
  get(url:string, params:any) {
    return $axios({
      method: 'get',
      url: url,
      params
    })
  },
  delete(url:string, params:any) {
    return $axios({
      method: 'delete',
      url: url,
      params
    })
  },
  patch(url:string, params:any) {
    return $axios({
      method: 'patch',
      url: url,
      params
    })
  },
  put(url:string, params:any) {
    return $axios({
      method: 'put',
      url: url,
      params
    })
  },
  //下载excel 
  down(url:string){
    // console.log('down-file===>',params);
    window.open(`${$axios.defaults.baseURL}${url}`);
  },
  upload(url:string, data:any) {
    return $axios({
      method: 'post',
      url: url,
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
