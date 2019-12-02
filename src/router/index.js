import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../containers/AuthContainer.vue'),
    children: [{
      path: '/',
      component: () => import('../views/auth/Login.vue')
    }]
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../containers/AuthContainer.vue'),
    children: [{
      path: '/',
      component: () => import('../views/auth/SignUp.vue')
    }]
  },
  {
    path: '/invitation',
    name: 'invitation',
    component: () => import('../containers/AuthContainer.vue'),
    children: [{
      path: '/',
      component: () => import('../views/auth/AcceptInvitation.vue')
    }]
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('../containers/AuthContainer.vue'),
    children: [{
      path: '/',
      component: () => import('../views/auth/ResetPassword.vue')
    }]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../containers/DashboardContainer.vue'),
    children: [{
      path: '/',
      component: () => import('../views/dashboard/Index.vue')
    }]
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
