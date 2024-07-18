import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import {VitePWA} from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
      include: '**/*.svg',
    }),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        // type: 'module',
      },
      mode: 'development',
      injectManifest: {
        globPatterns: ['**/*'],
      },
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'firebase-messaging-sw.js',
      manifest: {
        name: 'OrderSwift',
        short_name: 'OrderSwift',
        theme_color: '#290386',
        display: 'standalone',
        background_color: '#928AFF',
        start_url:'/member',
        icons: [
          {
            src: 'logo-192-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'logo-512-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'logo-512-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
