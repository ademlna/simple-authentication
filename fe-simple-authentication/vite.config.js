// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // penting!
    },
  },
  server: {
    host: true, // supaya bisa diakses lewat network / ngrok
    allowedHosts: [
      'fd15a475b2ae.ngrok-free.app', // tambahkan host ngrok kamu
      'https://8c9798f4036d.ngrok-free.app',
       'https://fd15a475b2ae.ngrok-free.app'
    ],
  },
});
