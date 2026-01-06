import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        format: "es",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/views": path.resolve(__dirname, "./src/views"),
      "@/config": path.resolve(__dirname, "./src/config"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/context": path.resolve(__dirname, "./src/context"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/layout": path.resolve(__dirname, "./src/layout"),
      "@/api": path.resolve(__dirname, "./src/api"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/redux": path.resolve(__dirname, "./src/redux"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/services": path.resolve(__dirname, "./src/services"),
    },
  },
});
