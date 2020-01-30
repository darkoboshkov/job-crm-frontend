import { ifAuthenticated, isAdminAuthorized } from '../utils';

export default [
    {
        path: '/admin/dashboard',
        component: () => import('../containers/DashboardContainer.vue'),
        children: [
            {
                path: '/',
                name: 'admin-dashboard',
                component: () => import('../views/dashboard/admin/Index.vue'),
                beforeEnter: isAdminAuthorized
            },
            {
                path: 'candidates',
                name: 'admin-candidates',
                component: () => import('../views/dashboard/admin/Candidates.vue'),
                beforeEnter: isAdminAuthorized
            },
            {
                path: 'chats',
                name: 'admin-chats',
                component: () => import('../views/dashboard/admin/Chats.vue'),
                beforeEnter: isAdminAuthorized
            },
            {
                path: 'matches',
                name: 'admin-matches',
                component: () => import('../views/dashboard/admin/Matches.vue'),
                beforeEnter: isAdminAuthorized
            },
            {
                path: 'profile/:id',
                name: 'admin-profile',
                component: () => import('../views/dashboard/admin/Profile.vue'),
                props: (route) => ({ mode: route.query.mode, id: route.params.id }),
                beforeEnter: isAdminAuthorized
            },
            {
                path: 'privacy',
                name: 'admin-privacy',
                component: () => import('../views/dashboard/admin/Privacy.vue'),
                beforeEnter: isAdminAuthorized
            },
            {
                path: 'setting',
                name: 'admin-setting',
                component: () => import('../views/dashboard/admin/setting/Index.vue'),
                beforeEnter: isAdminAuthorized
            },
            {
                path: 'matching',
                name: 'admin-matching',
                component: () => import('../views/dashboard/admin/Matching.vue'),
                beforeEnter: isAdminAuthorized
            },
            {
                path: 'matching-details',
                name: 'admin-matching-details',
                component: () => import('../views/dashboard/admin/MatchingDetails.vue'),
                beforeEnter: isAdminAuthorized
            },
        ],
        beforeEnter: ifAuthenticated
    }
]