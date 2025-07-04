import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: ["localhost", "frontend", "test-frontend"],
  },
});
