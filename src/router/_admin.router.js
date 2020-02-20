import { ifAuthenticated, isAdminAuthorized } from "../utils";

export default [
  {
    path: "/admin/dashboard",
    component: () => import("../containers/DashboardContainer.vue"),
    children: [
      {
        path: "/",
        name: "admin-dashboard",
        component: () => import("../views/dashboard/admin/Index.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "companies",
        name: "admin-companies",
        component: () => import("../views/dashboard/admin/companies/Index.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "companies/create",
        name: "admin-companies-create",
        component: () =>
          import("../views/dashboard/admin/companies/CompanyCreate.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "companies/:companyId",
        name: "admin-companies-detail",
        component: () =>
          import("../views/dashboard/admin/companies/CompanyDetail.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "candidates",
        name: "admin-candidates",
        component: () => import("../views/dashboard/admin/Candidates.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "users/create",
        name: "admin-users-create",
        component: () =>
          import("../views/dashboard/admin/users/UserCreate.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "users/create-manual",
        name: "admin-users-create-manual",
        component: () =>
          import("../views/dashboard/admin/users/UserCreateManual.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "users/create-invite",
        name: "admin-users-create-invite",
        component: () =>
          import("../views/dashboard/admin/users/UserCreateInvite.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "chats",
        name: "admin-chats",
        component: () => import("../views/dashboard/admin/Chats.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "jobs",
        name: "admin-jobs",
        component: () => import("../views/dashboard/admin/jobs/Index.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "job/create",
        name: "admin-job-create",
        component: () => import("../views/dashboard/admin/jobs/JobsCreate.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "jobs/:companyId/:jobId",
        name: "admin-jobs-detail",
        component: () => import("../views/dashboard/admin/jobs/JobsDetail.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "jobs/:companyId/:jobId/choose-candidate",
        name: "admin-jobs-choose-candidate",
        component: () =>
          import("../views/dashboard/admin/jobs/CandidateChoose.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "jobs/:companyId/:jobId/select-candidate",
        name: "admin-jobs-select-candidate",
        component: () =>
          import("../views/dashboard/admin/jobs/CandidateSelect.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "jobs/:companyId/:jobId/new-candidate",
        name: "admin-jobs-new-candidate",
        component: () =>
          import("../views/dashboard/admin/jobs/CandidateNew.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "jobs/:companyId/:jobId/matching",
        name: "admin-matching",
        component: () =>
          import("../views/dashboard/admin/jobs/MatchingJob.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "jobs/:companyId/:jobId/:workerId/matching-details",
        name: "admin-matching-details",
        component: () =>
          import("../views/dashboard/admin/jobs/MatchingDetails.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "profile/:companyId/:id",
        name: "admin-profile",
        component: () => import("../views/dashboard/admin/Profile.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "privacy",
        name: "admin-privacy",
        component: () => import("../views/dashboard/admin/Privacy.vue"),
        beforeEnter: isAdminAuthorized
      },
      {
        path: "setting",
        name: "admin-setting",
        component: () => import("../views/dashboard/admin/setting/Index.vue"),
        beforeEnter: isAdminAuthorized
      }
    ],
    beforeEnter: ifAuthenticated
  }
];
