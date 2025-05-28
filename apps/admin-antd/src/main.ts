import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "ant-design-vue/dist/reset.css";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
