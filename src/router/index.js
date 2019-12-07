import Vue from 'vue'
import VueRouter from 'vue-router'
import { i18n } from '../plugins/i18n'

Vue.use(VueRouter)

const routes = [
    {
        path: '/:lang',
        component: {
            template: '<router-view/>'
        },
        beforeEnter (to, from, next) {
            const lang = to.params.lang
            if (!['en', 'du'].includes(lang)) return next('en')
            if (i18n.locale !== lang) {
                i18n.locale = lang
            }

            return next()
        },
        children: [
            {
                path: 'login',
                component: () => import('../containers/AuthContainer.vue'),
                children: [{
                    path: '/',
                    name: 'login',
                    component: () => import('../views/auth/Login.vue')
                }]
            },
            {
                path: 'signup',
                component: () => import('../containers/AuthContainer.vue'),
                children: [{
                    path: '/',
                    name: 'signup',
                    component: () => import('../views/auth/SignUp.vue')
                }]
            },
            {
                path: 'verify',
                component: () => import('../containers/AuthContainer.vue'),
                children: [{
                    path: '/',
                    name: 'verify',
                    component: () => import('../views/auth/VerifyEmail.vue')
                },
                {
                    path: ':code',
                    name: 'verify-code',
                    component: () => import('../views/auth/VerifyEmail.vue')
                }]
            },
            {
                path: 'invitation',
                component: () => import('../containers/AuthContainer.vue'),
                children: [{
                    path: '/',
                    name: 'invitation',
                    component: () => import('../views/auth/AcceptInvitation.vue')
                }]
            },
            {
                path: 'forgot',
                component: () => import('../containers/AuthContainer.vue'),
                children: [{
                    path: '/',
                    name: 'forgot',
                    component: () => import('../views/auth/ForgotPassword.vue')
                }]
            },
            {
                path: 'reset',
                component: () => import('../containers/AuthContainer.vue'),
                children: [{
                    path: ':code',
                    name: 'reset',
                    component: () => import('../views/auth/ResetPassword.vue')
                }]
            },
            {
                path: 'dashboard',
                component: () => import('../containers/DashboardContainer.vue'),
                children: [{
                    path: '/',
                    name: 'dashboard',
                    component: () => import('../views/dashboard/Index.vue')
                }]
            },
            {
                path: '/',
                name: 'common',
                component: () => import('../views/Common.vue')
            },
            {
                path: '*',
                component: () => import('../containers/AuthContainer.vue'),
                children: [{
                    path: '/',
                    name: '404',
                    component: () => import('../views/Page404.vue')
                }]
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
