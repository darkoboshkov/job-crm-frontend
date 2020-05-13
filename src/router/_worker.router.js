import {
  ifAuthenticated,
  isWorkerAuthorized
} from "../utils";

export default [
  {
    path: "/worker/dashboard",
    component: () => import("../containers/DashboardContainer.vue"),
    children: [
      // {
      //   path: "/",
      //   name: "worker-dashboard",
      //   component: () => import("../views/dashboard/worker/Index.vue"),
      //   beforeEnter: isWorkerAuthorized
      // },
      // {
      //   path: "jobs",
      //   name: "worker-jobs",
      //   component: () => import("../views/dashboard/worker/jobs/Index.vue"),
      //   beforeEnter: isWorkerAuthorized
      // },
      // {
      //   path: "jobs/:jobId",
      //   name: "worker-jobs-detail",
      //   component: () =>
      //     import("../views/dashboard/worker/jobs/JobsDetail.vue"),
      //   beforeEnter: isWorkerAuthorized
      // },
      {
        path: "joboffers",
        name: "worker-offers",
        component: () => import("../views/dashboard/worker/offer/Index.vue"),
        beforeEnter: isWorkerAuthorized
      },
      {
        path: "joboffers/:offerId",
        name: "worker-offer-details",
        component: () => import("../views/dashboard/worker/offer/Details.vue"),
        beforeEnter: isWorkerAuthorized
      },
      {
        path: "chats",
        name: "worker-chats",
        component: () => import("../views/dashboard/worker/Chats.vue"),
        beforeEnter: isWorkerAuthorized
      },
      {
        path: "profile",
        name: "worker-profile",
        component: () => import("../views/dashboard/worker/Profile.vue"),
        beforeEnter: isWorkerAuthorized
      },
      {
        path: "privacy",
        name: "worker-privacy",
        component: () => import("../views/dashboard/worker/Privacy.vue"),
        beforeEnter: isWorkerAuthorized
      },
      {
        path: "setting",
        name: "worker-setting",
        component: () => import("../views/dashboard/worker/setting/Index.vue"),
        beforeEnter: isWorkerAuthorized
      },
      {
        path: "timesheets",
        name: "worker-timesheets",
        component: () =>
          import("../views/dashboard/worker/timesheets/Index.vue"),
        beforeEnter: isWorkerAuthorized
      }
    ],
    beforeEnter: ifAuthenticated
  }
];
