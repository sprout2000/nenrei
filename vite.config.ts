/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  root: './src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    deps: {
      inline: ['vitest-canvas-mock'],
    },
    threads: false,
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    coverage: {
      clean: false,
      enabled: true,
      reporter: ['text', 'json-summary'],
      reportsDirectory: '../coverage',
    },
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: '年齢計算アプリPWA',
        short_name: '年齢計算',
        description: '元号と西暦の両方で年齢を計算できます',
        start_url: '.',
        id: '/nenrei/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#ff0033',
        background_color: '#fff',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon-512x512-mask.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
