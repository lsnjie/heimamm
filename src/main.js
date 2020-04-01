import Vue from 'vue'
import App from './App.vue'

// 导入 router
import router from './router/index'
// 导入element-ui
import Element from 'element-ui'
// 导入 element样式
import 'element-ui/lib/theme-chalk/index.css';
// 导入全局样式
import './style/index.css'

// 使用element
Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')