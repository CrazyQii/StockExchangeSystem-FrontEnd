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
    path: '/stocklist',
    name: 'StockList',
    component: () => import('../views/StockList.vue')
  },
  {
    path: '/quote/:code',
    name: 'Quote',
    component: () => import('../views/Quote.vue'),
  },
  {
    path: '/detail/:code',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
  },
  {
    path: '/orderlist',
    name: 'OrderList',
    component: () => import('../views/OrderList.vue'),
  },
  // 管理员路由
  {
    path: '/accountlist',
    name: 'AccountList',
    component: () => import('../views/AccountList.vue'),
  },
  {
    path: '/riskmanage',
    name: 'RiskManage',
    component: () => import('../views/RiskManage.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
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
