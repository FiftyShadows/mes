import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'
import api from './api/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import util from './util'

Vue.use(ElementUI);
Vue.prototype.$api = api;
Vue.prototype.util = util;
Vue.config.productionTip = false;

var vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

export default vue
