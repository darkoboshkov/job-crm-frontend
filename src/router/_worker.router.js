import {ifAuthenticated, isWorkerAuthorized} from '../utils';

export default [
    {
        path: '/worker/dashboard',
        component: () => import('../containers/DashboardContainer.vue'),
        children: [
            {
                path: '/',
                name: 'worker-dashboard',
                component: () => import('../views/dashboard/worker/Index.vue'),
                beforeEnter: isWorkerAuthorized
            },
            {
                path: 'chats',
                name: 'worker-chats',
                component: () => import('../views/dashboard/worker/Chats.vue'),
                beforeEnter: isWorkerAuthorized
            },
            {
                path: 'profile/:id',
                name: 'worker-profile',
                component: () => import('../views/dashboard/worker/Profile.vue'),
                beforeEnter: isWorkerAuthorized
            },
            {
                path: 'privacy',
                name: 'worker-privacy',
                component: () => import('../views/dashboard/worker/Privacy.vue'),
                beforeEnter: isWorkerAuthorized
            },
            {
                path: 'setting',
                name: 'worker-setting',
                component: () => import('../views/dashboard/worker/setting/Index.vue'),
                beforeEnter: isWorkerAuthorized
            }
        ],
        beforeEnter: ifAuthenticated
    }
]