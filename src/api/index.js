import axios from 'axios'
import vue from '../main.js'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()

// 测试token

// 9999是PDA用的端口，不是单点
// 8080目前全部单点登录，正式会切到80
// 这个token只能测试用，正式代码里不要用，后台密钥不同，会验证不成功
const Token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjM4NGIyY2Q4NzEyMDY0ZjEwMWUzMWUiLCJ1aWQiOiI1YjM4NGIyY2Q4NzEyMDY0ZjEwMWUzMWUiLCJpc3MiOiJqYXBwLW1lcy1hdXRvIn0.h-CPVnDFw0YyCfm7MIAgXIqTlecAhT5VQe43i5aIUeE'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
axios.defaults.timeout = 3000
const baseAutoUrl = 'http://192.168.0.209:9999/api'
const baseWareUrl = ''

// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  switch (error.response.status) {
    case 401:
      console.log('登录信息过期，跳转登陆页')
      // router.replace('/login');
      break;
    case 403:
      vue.$notify.error({
          title: '错误',
          message: '您没有权限进行此操作'
      });
      // store.state.pageLoading = false;
      break;
    default:
      vue.$notify.error({
        title: '错误',
        message: `未知错误 ${error.response.status}`
      })
      return Promise.reject(error)
      break
  }
  return
})

export default {
  axios,
  /* --------------自动化--------------- */
  // 车间管理--获取数据
  getWorkShopsLine () {
    return axios.get(`${baseAutoUrl}/workshops`)
  },
  // 车间管理--新增
  createWorkshop (data) {
    return axios.post(`${baseAutoUrl}/workshops`, data)
  },
  // 车间管理--修改
  updateWorkshop (data) {
    return axios.put(`${baseAutoUrl}/workshops/${data.id}`, data)
  },
  // 车间管理--删除
  deleteWorkshop (data) {
    return axios.delete(`${baseAutoUrl}/workshops/${data}`)
  },

  // 线别控制--获取数据
  getLines (data) {
    return axios.get(`${baseAutoUrl}/workshops/${data}/lines`)
  },
  // 线别控制--新增
  creatSingleLine (data) {
    return axios.post(`${baseAutoUrl}/lines`, data)
  },
  // 线别控制--修改
  saveLine (data) {
    return axios.put(`${baseAutoUrl}/lines/${data.id}`, data)
  },
  
  // 机台管理--获取数据
  getSelected () {
    return axios.get(`${baseAutoUrl}/lines`)
  }
}
