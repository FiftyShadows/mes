import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 仓储
    workShops: [],
    Lines: [],
    isWareLogin: false, // ware系统登陆
    dict: [], // 班次
    batchList: [], // 批次
    warehouseType: ['固定库', '临时库', '立体库', '车丝库'], // 仓库类型
    workshop: [], // 车间
    sapStorage: [], // sap库存点
    warehouseList: [] // 仓库列表
  },
  getters: {
    batchList: state => state.batchList,
    workshop: state => state.workshop
  },
  mutations: {
    BatchList (state, batchList) {
      state.batchList = batchList
    },
    Workshop (state, workshop) {
      state.workshop = workshop
    },
    WarehouseList (state, warehouseList) {
      state.warehouseList = warehouseList
    },
    SapStorage (state, sapStorage) {
      state.sapStorage = sapStorage
    }
  },
  actions: {
    getDict (store, key) {
      api.getDict({key: key}).then(res => {
        store.state.dict = res.data.data
      })
    },
    getBatchList ({commit}) {
      api.getBatchList().then(res => {
        console.log(res)
        commit('BatchList', {batchList: res.data.data})
      })
    },
    getSelectWorkshop ({commit}) {
      api.getSelectWorkshop().then(res => {
        commit('Workshop', {workshop: res.data.data})
      })
    },
    getselectSapStorage ({commit}) {
      api.getselectSapStorage().then(res => {
        console.log(res)
        commit('SapStorage', {sapStorage: res.data.data})
      })
    },
    getSelectWarehouseList ({commit}) {
      api.getSelectWarehouseList().then(res => {
        console.log(res)
        commit('WarehouseList', {warehouseList: res.data.data})
      })
    }
  }
})

export default store
