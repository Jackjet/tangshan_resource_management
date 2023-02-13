/* 全局http处理 */
import axios from 'axios'
import router from '../../router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

// 设置超时时间 默认10s;
axios.defaults.timeout = 10 * 1000
axios.defaults.withCredentials = true
axios.defaults.baseURL = ''

axios.interceptors.request.use(function (config) {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    //config.cache = false
    if(/get/i.test(config.method)){  //get请求禁止缓存
      config.params = config.params || {}
      config.params.t = Date.parse(new Date())/1000  //添加时间戳
    }
  }
  // layer.closeAll('loading')
  // layer.load(1, {shade: [0.2, '#000']})
  NProgress.start()
  return config
}, function (error) {
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // layer.closeAll('loading')
  NProgress.done()
  if (response.data.code === '500800') {
    layer.closeAll()
    const currentUrl = window.location.href
    router.push({name: 'login', query: { service: currentUrl }})
    return Promise.reject(response.data)
  // 全局错误信息的提示，建议各自页面处理，全局弹层提示错误体验不佳
  // } else if (response.data.status === 'ERROR') {
  //   console.log(response.data.message)
  //   // layer.alert(response.data.message, {icon: 2})
  //   // 未授权的情况
  //   // if (response.data.code === '500900' || response.data.code === '500910') {
  //   //   location.href = '/userInfo.html#user/auth';
  //   // }
  //   return Promise.reject(response.data)
  }
  return response.data
}, function (error) {
  console.log(error)
  return Promise.reject(error)
})

export default axios
