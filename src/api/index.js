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
  return response
}, function (error) {
  switch (error.response.status) {
    case 401:
      console.log('登录信息未认证')
      // router.replace('/login');
      break
    case 403:
      vue.$notify.error({
          title: '错误',
          message: '您没有权限进行此操作'
      });
      // store.state.pageLoading = false;
      break
    case 404:
    vue.$notify.error({
        title: '错误',
        message: '未找到接口数据'
    });
    // store.state.pageLoading = false;
    break
    default:
      vue.$notify.error({
        title: '错误',
        message: `未知错误 ${error.response.status}`
      })
      return Promise.reject(error)
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
  },
  getMachines (data) {
    return axios.get(`${baseAutoUrl}/lines/${data}/lineMachines`)
  },
  // 机台管理--添加
  AddMachine (data) {
    return axios.post(`${baseAutoUrl}/lineMachines`, data)
  },
  // 机台管理--修改
  saveMachine (data) {
    return axios.put(`${baseAutoUrl}/lineMachines/${data.id}`, data)
  },

  // 产品管理--获取数据
  getProduct () {
    return axios.get(`${baseAutoUrl}/products`)
  },
  // 产品管理--修改
  saveProduct (data) {
    return axios.put(`${baseAutoUrl}/products`, data)
  },
  // 产品管理--添加
  addProduct (data) {
    return axios.post(`${baseAutoUrl}/products`, data)
  },
  // 产品管理--配置--获取数据
  getTabData (data) {
    return axios.get(`${baseAutoUrl}/products/${data}/productProcesses`)
  },

  // 丝车管理--获取数据
  getSilks (data) {
    return axios.get(`${baseAutoUrl}/silkCars?pageSize=${data.pageSize}&first=${data.first}&q=${data.q}`)
  },
  getCorporations () {
    return axios.get(`${baseAutoUrl}/corporations`)
  },
  // 丝车管理--添加
  addSilks (data) {
    return axios.post(`${baseAutoUrl}/silkCars`, data)
  },
  // 丝车管理--修改
  saveSilks (data) {
    return axios.put(`${baseAutoUrl}/silkCars/${data.id}`, data)
  },

  // 等级管理--获取数据
  getGrades () {
    return axios.get(`${baseAutoUrl}/grades`)
  },
  // 等级管理--增加数据
  AddGrades (data) {
    return axios.post(`${baseAutoUrl}/grades`, data)
  },
  // 等级管理--修改数据
  SaveGrades (data) {
    return axios.put(`${baseAutoUrl}/grades/${data.id}`, data)
  },

  // 车间生产计划
  getLinePlans (data) {
    return axios.get(`${baseAutoUrl}/reports/workshopProductPlanReport?workshopId=${data}`)
  },

  // 通知单--获取数据
  getNotices (data) {
    return axios.get(`${baseAutoUrl}/productPlanNotifies?pageSize=${data.pageSize}&first=${data.first}&q=${data.q}`)
  },
  // 通知单--执行情况
  getPerforms (data) {
    return axios.get(`${baseAutoUrl}/productPlanNotifies/${data}/exeInfo`)
  },
  // 通知单--结束执行
  finishNotice (data) {
    return axios.put(`${baseAutoUrl}/productPlanNotifies/${data}/finish`)
  },

  // 批号管理--获取数据
  getBatches (data) {
    return axios.get(`${baseAutoUrl}/batches?pageSize=${data.pageSize}&first=${data.first}&q=${data.q}`)
  },
  // 批号管理--新增
  addBatch (data) {
    return axios.post(`${baseAutoUrl}/batches`, data)
  },
  // 批号管理--删除
  deleteBatch (data) {
    return axios.delete(`${baseAutoUrl}/batches/${data}`)
  },
  // 批号管理--修改
  SaveBatches (data) {
    return axios.put(`${baseAutoUrl}/batches/${data.id}`, data)
  },

  // 管理员权限--获取数据
  getAdmins () {
    return axios.get(`${baseAutoUrl}/permissions`)
  },
  // 管理员权限-添加
  addAdmins (data) {
    return axios.post(`${baseAutoUrl}/permissions`, data)
  },
  // 管理员权限-修改
  saveAdmin (data) {
    return axios.put(`${baseAutoUrl}/permissions/${data.id}`, data)
  },
  // 管理员权限-删除
  deleteAdmin (data) {
    return axios.delete(`${baseAutoUrl}/permissions/${data}`)
  },

  // 用户组--获取数据
  getUsergroups () {
    return axios.get(`${baseAutoUrl}/operatorGroups`)
  },
  // 用户组--创建
  addUsergroups (data) {
    return axios.post(`${baseAutoUrl}/operatorGroups`, data)
  },
  // 用户组--修改
  saveUsergroups (data) {
    return axios.put(`${baseAutoUrl}/operatorGroups/${data.id}`, data)
  },

  // 用户--获取
  getUser (data) {
    return axios.get(`${baseAutoUrl}/operators?pageSize=${data.pageSize}&first=${data.first}&q=${data.q}`)
  },
  // 用户--搜索所有用户
  getAllUsers (data) {
    return axios.get(`${baseAutoUrl}/suggestOperators?q=${data}`)
  },
  // 用户--添加用户
  addUser (data) {
    return axios.post(`${baseAutoUrl}/operators`, data)
  }
}
