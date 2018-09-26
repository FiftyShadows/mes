import axios from 'axios'
import vue from '../main.js'
import global from '../window_global'
// import promiseFinally from 'promise.prototype.finally'

// promiseFinally.shim()

// 测试token

// 9999是PDA用的端口，不是单点
// 8080目前全部单点登录，正式会切到80
// 这个token只能测试用，正式代码里不要用，后台密钥不同，会验证不成功
const Token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjM4NGIyY2Q4NzEyMDY0ZjEwMWUzMWUiLCJ1aWQiOiI1YjM4NGIyY2Q4NzEyMDY0ZjEwMWUzMWUiLCJpc3MiOiJqYXBwLW1lcy1hdXRvIn0.h-CPVnDFw0YyCfm7MIAgXIqTlecAhT5VQe43i5aIUeE'
// 仓储token
// const Token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZW5neWkiLCJhZG1pbiI6InBhc3N3b3JkIiwiaWF0IjoxNTM3MzI0NDY0fQ.QGMzQXX09igK9gaKAq5jfniTpioa12st7h9FCZ-D7AY'

// 自动化Token
axios.defaults.headers.common['Authorization'] = 'Bearer ' + Token
// 仓储Token
// axios.defaults.headers.common['Authorization'] = Token
axios.defaults.timeout = 3000
const baseAutoUrl = global.auto
const baseWareUrl = global.ware

// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  switch (error.response.status) {
    case 401:
      vue.$notify.error({
        title: '错误',
        message: '登录信息未认证'
      })
      break
    case 403:
      vue.$notify.error({
        title: '错误',
        message: '您没有权限进行此操作'
      })
      break
    case 404:
      vue.$notify.error({
        title: '错误',
        message: '未找到接口数据'
      })
      // store.state.pageLoading = false;
      break
    default:
      vue.$notify.error({
        title: '错误',
        message: `未知错误 ${error.response.status}`
      })
      return Promise.reject(error)
  }
})

export default {
  axios,
  // =========================================== 自动化 ===========================================
  // 当前--搜索
  getCurrentSelect (data) {
    return axios.get(`${baseAutoUrl}/autoComplete/silkCar?q=${data}`)
  },
  // 当前--搜索数据
  getSearchData (data) {
    return axios.get(`${baseAutoUrl}/silkCarRuntimes/${data}`)
  },
  // 当前--操作员
  getOperators (data) {
    return axios.get(`${baseAutoUrl}/operators/${data}`)
  },
  // 当前--选择器数据
  getProcesses (data) {
    return axios.get(`${baseAutoUrl}/products/${data}/productProcesses`)
  },
  // 当前--操作人生产工序
  productProcesses (data) {
    return axios.get(`${baseAutoUrl}/productProcesses/${data}`)
  },
  // 当前--丝锭异常
  getSilkExceptions (data) {
    return axios.get(`${baseAutoUrl}/silkExceptions/${data}`)
  },
  // 当前--丝车备注
  getSilkNotes (data) {
    return axios.get(`${baseAutoUrl}/silkNotes/${data}`)
  },
  // 当前--操作数据保存
  ProductProcessSubmitEvents (data) {
    return axios.post(`${baseAutoUrl}/ProductProcessSubmitEvents`, data)
  },
  // 当前--标佯丝提交
  DyeingSampleSubmitEvents (data) {
    return axios.post(`${baseAutoUrl}/DyeingSampleSubmitEvents`, data)
  },

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
  // 产品管理--配置--修改顺序
  sortProesses (data) {
    return axios.put(`${baseAutoUrl}/productProcesses/${data.id}`, data)
  },
  // 产品管理--配置--丝锭异常
  silkExceptions () {
    return axios.get(`${baseAutoUrl}/silkExceptions`)
  },
  // 产品管理--配置--新增丝锭异常
  addsilkExceptions (data) {
    return axios.post(`${baseAutoUrl}/silkExceptions`, data)
  },
  // 产品管理--配置--丝锭备注
  silkNotes () {
    return axios.get(`${baseAutoUrl}/silkNotes`)
  },
  // 产品管理--配置--新增丝锭备注
  addSilkNotes (data) {
    return axios.post(`${baseAutoUrl}/silkNotes`, data)
  },
  // 产品管理--配置--表单搜索
  searchForms (data) {
    return axios.get(`${baseAutoUrl}/autoComplete/formConfig?q=${data}`)
  },
  // 产品管理--配置--新建字段
  addCode (data) {
    return axios.post(`${baseAutoUrl}/formConfigs`, data)
  },
  // 产品管理--配置--修改字段
  saveCode (data) {
    return axios.put(`${baseAutoUrl}/formConfigs/${data.id}`, data)
  },
  // 产品管理--配置--添加工序
  addProductProcesses (data) {
    return axios.post(`${baseAutoUrl}/productProcesses`, data)
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
  // 丝车管理--批量添加
  addBatchSilks (data) {
    return axios.post(`${baseAutoUrl}/batchSilkCars`, data)
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
  // 通知单--添加
  addNotices (data) {
    return axios.post(`${baseAutoUrl}/productPlanNotifies`, data)
  },
  // 通知单--执行操作
  exeNotices (data) {
    return axios.post(`${baseAutoUrl}/productPlanNotifies/${data.id}/exe`, data)
  },
  // 通知单--修改通知单
  saveNotice (data) {
    return axios.put(`${baseAutoUrl}/productPlanNotifies/${data.id}`, data)
  },
  // 通知单--搜索获取线别数据
  getLinesList (data) {
    return axios.get(`${baseAutoUrl}/lines?pageSize=${data.pageSize}&q=${data.q}`)
  },
  // 通知单--搜索线别列表
  getLinesData (data) {
    return axios.get(`${baseAutoUrl}/lines/${data}/lineMachines`)
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
  },
  // 用户--修改权限
  saveUserpermissions (data) {
    return axios.put(`${baseAutoUrl}/operators/${data.id}`, data)
  },
  // 获取丝车历史信息
  getSilkCarRecords (data) {
    return axios.get(`${baseAutoUrl}/silkCarRecords?startTime=${data.startTime}&endTime=${data.endTime}&q=${data.silkCarCode}`)
  },

  // =========================================== 仓储 ===========================================
  wareLogin (data) { // 登陆
    return axios.post(`${baseWareUrl}/system/login`, data)
  },
  getDict (data) { // 通用下拉菜单
    return axios.post(`${baseWareUrl}/mes/system/dict/getDict`, data)
  },
  getSelectRole () { // 角色下拉接口
    return axios.post(`${baseWareUrl}/mes/system/role/selectRole`)
  },
  getBatchList () { // 查询所有批次
    return axios.post(`${baseWareUrl}/mes/warehouseInfo/storage/getBatchList`)
  },
  getMaterialList (data) { // sap信息--物料查询
    return axios.post(`${baseWareUrl}/mes/warehouseInfo/material/getMaterialList`, data)
  },
  getSapStorage (data) { // sap信息--sap库位
    return axios.post(`${baseWareUrl}/warehouseInfo/sapStorage/selectSapStorage`, data)
  },
  updateSapStorage (data) { // sap信息--sap库位更新
    return axios.post(`${baseWareUrl}/warehouseInfo/sapStorage/updateSapStorage`, data)
  },
  addSapStorage (data) { // sap信息--sap库位添加
    return axios.post(`${baseWareUrl}/warehouseInfo/sapStorage/addSapStorage`, data)
  },
  deleteSapStorage (data) { // sap信息--sap库位删除
    return axios.post(`${baseWareUrl}/warehouseInfo/sapStorage/deleteSapStorage`, data)
  },
  getReasonList (data) { // 翻包原因--获取原因
    return axios.post(`${baseWareUrl}/mes/warehouseInfo/turnoverPackage/getReasonList`, data)
  },
  addReason (data) { // 翻包原因--添加原因
    return axios.post(`${baseWareUrl}/mes/warehouseInfo/turnoverPackage/addReason`, data)
  },
  updateReason (data) { // 翻包原因--更新原因
    return axios.post(`${baseWareUrl}/mes/warehouseInfo/turnoverPackage/updateReason`, data)
  },
  deleteReason (data) { // 翻包原因--删除原因
    return axios.post(`${baseWareUrl}/mes/warehouseInfo/turnoverPackage/deleteReason`, data)
  }
}
