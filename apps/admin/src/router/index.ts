import type { App } from "vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import LoginView from "@/views/login/index.vue";
import RegisterView from "@/views/login/register.vue";
const routes = [
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export function setupRouter(app: App) {
  app.use(router);
}

export default { setupRouter };
