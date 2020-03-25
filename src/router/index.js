import Vue from "vue";
import VueRouter from "vue-router";
import { ifAuthenticated } from "../utils";
import authRoutes from "./_auth.router";
import adminRoutes from "./_admin.router";
import managerRoutes from "./_manager.router";
import workerRoutes from "./_worker.router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  ...authRoutes,
  ...adminRoutes,
  ...managerRoutes,
  ...workerRoutes,
  {
    path: "/summary",
    component: () => import("../containers/SummaryContainer.vue"),
    children: [
      {
        path: "/",
        name: "summary",
        component: () => import("../views/summary/Index.vue")
      }
    ],
    beforeEnter: ifAuthenticated
  },
  {
    path: "/dashboard",
    redirect: to => {
      if (store.state.user.role) {
        return `/${store.state.user.role}/dashboard`;
      }
      return "/404";
    }
  },
  {
    path: "/common",
    name: "common",
    component: () => import("../views/Common.vue")
  },
  {
    path: "/welcome",
    component: () => import("../containers/AuthContainer.vue"),
    children: [
      {
        path: "/",
        name: "welcome",
        component: () => import("../views/Welcome.vue")
      }
    ]
  },
  {
    path: "/language",
    component: () => import("../containers/AuthContainer.vue"),
    children: [
      {
        path: "/",
        name: "language",
        component: () => import("../views/Language.vue")
      }
    ]
  },
  {
    path: "*",
    component: () => import("../containers/AuthContainer.vue"),
    children: [
      {
        path: "/",
        name: "404",
        component: () => import("../views/Page404.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
