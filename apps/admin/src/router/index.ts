import {
  createWebHistory,
  createRouter,
  type RouteRecordRaw,
} from "vue-router";

import DashBoard from "@/views/layouts/DashBoard.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DashBoard,
    children: [
      {
        path: "/about",
        component: () => import("@/views/layouts/HomeView.vue"),
      },
    ],
  },
  { path: "/login", component: () => import("@/views/layouts/LoginView.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
