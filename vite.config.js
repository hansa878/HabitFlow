import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
     proxy: {
      // Any request to /api/quote will be proxied to ZenQuotes API
      '/api/quote': {
        target: 'https://zenquotes.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/quote/, '/api/today'),
      },
    },
  },

  plugins: [react()],
});
