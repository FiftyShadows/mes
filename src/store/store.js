import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    workShops: [],
    Lines: [],
    isWareLogin: false // ware系统登陆
  },
  getters: {},
  mutations: {},
  actions: {}
})

export default store
