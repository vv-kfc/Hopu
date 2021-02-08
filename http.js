import axios from 'axios'
import Vue from 'vue'
import router from '@/router/index.js'
const http = axios.create({
  baseURL: 'http://112.74.99.5:3000/web/api'
})

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    if (localStorage.getItem('token') && localStorage.getItem('id')) {
      // 在发送请求之前添加token验证
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 对响应错误做点什么
    if (error.response.data.message) {
      Vue.prototype.$msg.fail(error.response.data.message)
    } else {
      Vue.prototype.$msg.fail('请先登录')
    }
    router.push('/login')
    return Promise.reject(error)
  }
)

export default http
