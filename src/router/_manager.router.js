import {ifAuthenticated, isAdminAuthorized, isManagerAuthorized} from "../utils";

export default [
  {
    path: "/manager/dashboard",
    component: () => import("../containers/DashboardContainer.vue"),
    children: [
      {
        path: "/",
        name: "manager-dashboard",
        component: () => import("../views/dashboard/manager/Index.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "candidates",
        name: "manager-candidates",
        component: () => import("../views/dashboard/manager/Candidates.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "users/create",
        name: "manager-users-create",
        component: () =>
          import("../views/dashboard/manager/users/UserCreate.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "users/create-manual",
        name: "manager-users-create-manual",
        component: () =>
          import("../views/dashboard/manager/users/UserCreateManual.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "users/create-invite",
        name: "manager-users-create-invite",
        component: () =>
          import("../views/dashboard/manager/users/UserCreateInvite.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "chats",
        name: "manager-chats",
        component: () => import("../views/dashboard/manager/Chats.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "jobs",
        name: "manager-jobs",
        component: () => import("../views/dashboard/manager/jobs/Index.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "job/create",
        name: "manager-job-create",
        component: () =>
          import("../views/dashboard/manager/jobs/JobsCreate.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "jobs/:jobId",
        name: "manager-jobs-detail",
        component: () =>
          import("../views/dashboard/manager/jobs/JobsDetail.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "jobs/:jobId/choose-candidate",
        name: "manager-jobs-choose-candidate",
        component: () =>
          import("../views/dashboard/manager/jobs/CandidateChoose.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "jobs/:jobId/select-candidate",
        name: "manager-jobs-select-candidate",
        component: () =>
          import("../views/dashboard/manager/jobs/CandidateSelect.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "jobs/:jobId/new-candidate",
        name: "manager-jobs-new-candidate",
        component: () =>
          import("../views/dashboard/manager/jobs/CandidateNew.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "jobs/:jobId/matching",
        name: "manager-matching",
        component: () =>
          import("../views/dashboard/manager/jobs/MatchingJob.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "jobs/:jobId/:workerId/matching-details",
        name: "manager-matching-details",
        component: () =>
          import("../views/dashboard/manager/jobs/MatchingDetails.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "joboffers/:offerId",
        name: "manager-offer-details",
        component: () => import("../views/dashboard/manager/offer/Details.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "profile/:id",
        name: "manager-profile",
        component: () => import("../views/dashboard/manager/Profile.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "privacy",
        name: "manager-privacy",
        component: () => import("../views/dashboard/manager/Privacy.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "setting",
        name: "manager-setting",
        component: () => import("../views/dashboard/manager/setting/Index.vue"),
        beforeEnter: isManagerAuthorized
      },
      {
        path: "timesheets",
        name: "manager-timesheets",
        component: () => import("../views/dashboard/manager/timesheets/Index.vue"),
        beforeEnter: isManagerAuthorized
      },
    ],
    beforeEnter: ifAuthenticated
  }
];
