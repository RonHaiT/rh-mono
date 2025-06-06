import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
    AutoImport({
      imports: ["vue", "vue-router"],
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve("./src"), // @代替src
    },
  },
  server: {
    port: 5556,
  },
});
