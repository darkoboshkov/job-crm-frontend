import {ifAuthenticated, isManagerAuthorized} from '../utils';

export default [
    {
        path: '/manager/dashboard',
        component: () => import('../containers/DashboardContainer.vue'),
        children: [
            {
                path: '/',
                name: 'manager-dashboard',
                component: () => import('../views/dashboard/manager/Index.vue'),
                beforeEnter: isManagerAuthorized
            },
            {
                path: 'candidates',
                name: 'manager-candidates',
                component: () => import('../views/dashboard/manager/Candidates.vue'),
                beforeEnter: isManagerAuthorized
            },
            {
                path: 'chats',
                name: 'manager-chats',
                component: () => import('../views/dashboard/manager/Chats.vue'),
                beforeEnter: isManagerAuthorized
            },
            {
                path: 'matches',
                name: 'manager-matches',
                component: () => import('../views/dashboard/manager/Matches.vue'),
                beforeEnter: isManagerAuthorized
            },
            {
                path: 'profile/:id',
                name: 'manager-profile',
                component: () => import('../views/dashboard/manager/Profile.vue'),
                beforeEnter: isManagerAuthorized
            },
            {
                path: 'privacy',
                name: 'manager-privacy',
                component: () => import('../views/dashboard/manager/Privacy.vue'),
                beforeEnter: isManagerAuthorized
            },
            {
                path: 'setting',
                name: 'manager-setting',
                component: () => import('../views/dashboard/manager/setting/Index.vue'),
                beforeEnter: isManagerAuthorized
            }
        ],
        beforeEnter: ifAuthenticated
    }
]