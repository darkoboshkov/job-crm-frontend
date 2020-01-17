import { ifAuthenticated } from '../utils';

export default [
    {
        path: '/admin/dashboard',
        component: () => import('../containers/DashboardContainer.vue'),
        children: [
            {
                path: '/',
                name: 'admin-dashboard',
                component: () => import('../views/dashboard/admin/Index.vue')
            },
            {
                path: 'candidates',
                name: 'admin-candidates',
                component: () => import('../views/dashboard/admin/Candidates.vue')
            },
            {
                path: 'chats',
                name: 'admin-chats',
                component: () => import('../views/dashboard/admin/Chats.vue')
            },
            {
                path: 'matches',
                name: 'admin-matches',
                component: () => import('../views/dashboard/admin/Matches.vue')
            },
            {
                path: 'profile/:id',
                name: 'admin-profile',
                component: () => import('../views/dashboard/admin/Profile.vue')
            },
            {
                path: 'privacy',
                name: 'admin-privacy',
                component: () => import('../views/dashboard/admin/Privacy.vue')
            },
            {
                path: 'setting',
                name: 'admin-setting',
                component: () => import('../views/dashboard/admin/setting/Index.vue')
            }
        ],
        beforeEnter: ifAuthenticated
    }
]