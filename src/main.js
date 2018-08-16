import Vue from 'vue'
import App from './App'
import router from './router'
import Store from './store/store'
import api from './api/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Global from './window_global.js'

Vue.use(ElementUI)
Vue.prototype.$api = api
Vue.prototype.global = Global
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  Store,
  components: { App },
  template: '<App/>'
})
