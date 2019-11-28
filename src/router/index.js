import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/auth/SignUp.vue')
  },
  {
    path: '/',
    name: 'common',
    component: () => import('../views/Common.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
