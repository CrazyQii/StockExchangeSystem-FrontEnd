import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 公共路由
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/auth/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/Register.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/auth/Profile.vue'),
  },
  // 普通用户路由
  {
    path: '/stock-list',
    name: 'StockList',
    component: () => import('../views/stock/StockList.vue'),
    meta: {
      keepAlive: true // 需要缓存
    }
  },
  {
    path: '/quote/:code',
    name: 'Quote',
    component: () => import('../views/stock/Quote.vue'),
  },
  {
    path: '/detail/:code',
    name: 'Detail',
    component: () => import('../views/stock/Detail.vue'),
  },
  {
    path: '/stock-note',
    name: 'Note',
    component: () => import('../views/stock/Note.vue'),
  },
  {
    path: '/stock-tiger',
    name: 'TigerStock',
    component: () => import('../views/stock/StockTiger.vue'),
    // meta: {
    //   keepAlive: true // 需要缓存
    // }
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// 全局导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    return next()
  }
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) {
    Vue.prototype.$message.error("请先登录！！！");
    return next('/login')
  }
  next()
})

export default router
