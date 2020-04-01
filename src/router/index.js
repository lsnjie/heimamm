// 导入  Vue
import Vue from "vue"
// 导入VueRouter
import VueRouter from 'vue-router'

// 导入 login组件
import login from '../views/login/index.vue'
// 注册Vue
Vue.use(VueRouter)

import axios from 'axios'
// 全局样式  axios
Vue.prototype.$axios = axios

// 实列化路由
const router = new VueRouter({
    routes: [{
            path: '/login',
            component: login
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
})

export default router