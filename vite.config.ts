import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  root: './src',
  server: {
    open: true,
  },
  build: {
    outDir: '../docs',
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        background_color: '#efeff4',
        categories: ['business', 'health', 'utilities'],
        description: '西暦と和暦の両方で年齢計算ができます。',
        display: 'standalone',
        icons: [
          {
            sizes: '192x192',
            src: 'images/icon-192x192.png',
            type: 'image/png',
          },
          {
            sizes: '192x192',
            src: 'images/icon-192x192-maskable.png',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            sizes: '512x512',
            src: 'images/icon-512x512.png',
            type: 'image/png',
          },
        ],
        name: '年齢計算',
        orientation: 'portrait',
        screenshots: [
          {
            sizes: '960x1360',
            src: 'images/screenshot.png',
            type: 'image/png',
          },
        ],
        short_name: '年齢計算',
        shortcuts: [
          {
            description: '西暦と和暦の両方で年齢計算ができます。',
            icons: ['images/icon-96x96.png'],
            name: '年齢計算',
            url: '.',
          },
        ],
        start_url: '.',
        theme_color: '#ff0033',
      },
    }),
  ],
});
