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
    outDir: '../public',
    emptyOutDir: true,
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: '年齢計算',
        short_name: '年齢計算',
        categories: ['business', 'health', 'utilities'],
        description: '西暦と和暦の両方で年齢計算ができます。',
        start_url: '.',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#ff0033',
        background_color: '#efeff4',
        icons: [
          {
            sizes: '192x192',
            src: 'images/icon-192x192.png',
            type: 'image/png',
          },
          {
            sizes: '512x512',
            src: 'images/icon-512x512.png',
            type: 'image/png',
          },
          {
            sizes: '192x192',
            src: 'images/icon-192x192-maskable.png',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            sizes: '960x1360',
            src: 'images/screenshot.png',
            type: 'image/png',
          },
        ],
        shortcuts: [
          {
            name: '年齢計算',
            short_name: '年齢計算',
            description: '西暦と和暦の両方で年齢計算ができます。',
            url: '.',
            icons: ['images/icon-96x96.png'],
          },
        ],
        protocol_handlers: [
          {
            protocol: 'web+nenrei',
            url: '/%s',
          },
        ],
      },
    }),
  ],
});
