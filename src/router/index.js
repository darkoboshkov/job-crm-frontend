import Vue from 'vue';
import VueRouter from 'vue-router';
import { ifAuthenticated, ifNotAuthenticated } from '../utils';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: () => import('../containers/AuthContainer.vue'),
        children: [{
            path: '/',
            name: 'login',
            component: () => import('../views/auth/Login.vue')
        }],
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/signup',
        component: () => import('../containers/AuthContainer.vue'),
        children: [{
            path: '/',
            name: 'signup',
            component: () => import('../views/auth/SignUp.vue')
        }],
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/verify',
        component: () => import('../containers/AuthContainer.vue'),
        children: [
            {
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
        path: '/invitation',
        component: () => import('../containers/AuthContainer.vue'),
        children: [{
            path: '/',
            name: 'invitation',
            component: () => import('../views/auth/AcceptInvitation.vue')
        }],
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/forgot',
        component: () => import('../containers/AuthContainer.vue'),
        children: [{
            path: '/',
            name: 'forgot',
            component: () => import('../views/auth/ForgotPassword.vue')
        }],
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/reset',
        component: () => import('../containers/AuthContainer.vue'),
        children: [{
            path: ':code',
            name: 'reset',
            component: () => import('../views/auth/ResetPassword.vue')
        }],
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/summary',
        component: () => import('../containers/SummaryContainer.vue'),
        children: [{
            path: '/',
            name: 'summary',
            component: () => import('../views/summary/Index.vue')
        }],
        beforeEnter: ifAuthenticated
    },
    {
        path: '/dashboard',
        component: () => import('../containers/DashboardContainer.vue'),
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: () => import('../views/dashboard/Index.vue')
            },
            {
                path: 'candidates',
                name: 'candidates',
                component: () => import('../views/dashboard/Candidates.vue')
            },
            {
                path: 'news',
                name: 'news',
                component: () => import('../views/dashboard/News.vue')
            },
            {
                path: 'matches',
                name: 'matches',
                component: () => import('../views/dashboard/Matches.vue')
            },
            {
                path: 'profile/:id',
                name: 'profile',
                component: () => import('../views/dashboard/Profile.vue')
            },
            {
                path: 'privacy',
                name: 'privacy',
                component: () => import('../views/dashboard/Privacy.vue')
            },
            {
                path: 'setting',
                name: 'setting',
                component: () => import('../views/dashboard/Setting/Index.vue')
            }
        ],
        beforeEnter: ifAuthenticated
    },
    {
        path: '/common',
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
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
