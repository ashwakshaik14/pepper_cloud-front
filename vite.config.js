import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173,
    host: "0.0.0.0",
    allowedHosts: ["pepper-cloud-front.onrender.com"], // Allow your Render domain
  },
  preview: {
    port: process.env.PORT || 4173,
    host: "0.0.0.0",
  },
});
