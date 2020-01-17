import { ifAuthenticated } from '../utils';

export default [
    {
        path: '/manager/dashboard',
        component: () => import('../containers/DashboardContainer.vue'),
        children: [
            {
                path: '/',
                name: 'manager-dashboard',
                component: () => import('../views/dashboard/manager/Index.vue')
            },
            {
                path: 'candidates',
                name: 'manager-candidates',
                component: () => import('../views/dashboard/manager/Candidates.vue')
            },
            {
                path: 'chats',
                name: 'manager-chats',
                component: () => import('../views/dashboard/manager/Chats.vue')
            },
            {
                path: 'matches',
                name: 'manager-matches',
                component: () => import('../views/dashboard/manager/Matches.vue')
            },
            {
                path: 'profile/:id',
                name: 'manager-profile',
                component: () => import('../views/dashboard/manager/Profile.vue')
            },
            {
                path: 'privacy',
                name: 'manager-privacy',
                component: () => import('../views/dashboard/manager/Privacy.vue')
            },
            {
                path: 'setting',
                name: 'manager-setting',
                component: () => import('../views/dashboard/manager/setting/Index.vue')
            }
        ],
        beforeEnter: ifAuthenticated
    }
]