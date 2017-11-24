// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import elementUi from 'element-ui'
//import '@/fetch.js'

Vue.config.productionTip = false
import 'element-ui/lib/theme-default/index.css'
import './assets/css/index.sass'

Vue.prototype.$echarts = echarts
Vue.prototype.$max = function(arr) {
    return Math.max.apply({},arr)
}
Vue.use(elementUi)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
