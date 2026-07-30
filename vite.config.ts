import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 使用自定义域名 aiaiba.org，因此资源从域名根目录加载。
  base: "/",
});
