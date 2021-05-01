import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
