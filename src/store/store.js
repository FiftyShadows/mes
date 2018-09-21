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
    batchList: [] // 批次
  },
  getters: {},
  mutations: {
    dict (state, data) {
      state = data
    }
  },
  actions: {
    getDict (store, key) {
      api.getDict({key: key}).then(res => {
        store.state.dict = res.data.data
      })
    },
    getBatchList (store) {
      api.getBatchList().then(res => {
        store.state.batchList = res.data.data
        console.log(store.state.batchList)
      })
    }
  }
})

export default store
