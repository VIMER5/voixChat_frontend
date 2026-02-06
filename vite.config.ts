import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      "@modalWindows": fileURLToPath(new URL("./src/shared/modalWindows", import.meta.url)),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/shared/components", import.meta.url)),
      "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
      "@model": fileURLToPath(new URL("./src/app/model", import.meta.url)),
      "@icons": fileURLToPath(new URL("./src/shared/icon", import.meta.url)),
      "@layout": fileURLToPath(new URL("./src/app/layout", import.meta.url)),
    },
  },
});
