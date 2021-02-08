import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import UserInfo from '@/views/UserInfo.vue'
import Edit from '@/views/Edit.vue'
import videoInfo from '@/views/videoInfo.vue'
import editCategory from '@/views/editCategory.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/userinfo',
    name: 'UserInfo',
    component: UserInfo,
    meta: {
      isToken: true // 表示需要登录才能访问
    }
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit,
    meta: {
      isToken: true // 表示需要登录才能访问
    }
  },
  {
    path: '/videoInfo/:id',
    name: videoInfo,
    component: videoInfo
  },
  {
    path: '/editCategory',
    name: 'editCategory',
    component: editCategory
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 配置前端路由守卫导航
router.beforeEach((to, from, next) => {
  if (to.meta.isToken && !localStorage.getItem('token')) {
    Vue.prototype.$msg.fail('请先登录')
    router.push('/login')
    return
  }
  next()
})

export default router
