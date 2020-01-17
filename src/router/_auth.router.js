import { ifNotAuthenticated } from '../utils';

export default [
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
    }
]