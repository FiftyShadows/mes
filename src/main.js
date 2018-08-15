import Vue from 'vue'
import App from './App'
import router from './router'
import Store from './store/store'
import api from './api/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.prototype.api = api
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  Store,
  components: { App },
  template: '<App/>'
})
