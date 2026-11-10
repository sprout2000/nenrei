import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import pkg from './package.json';

export default defineConfig(({ mode }) => {
  // GitHub Pages (https://sprout2000.github.io/nenrei/) 向けのビルド(--mode github)だけ
  // サブパスを使い、ローカルの dev / build / preview はルート(/)で動かす
  const base = mode === 'github' ? '/nenrei/' : '/';

  return {
    base,
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
        manifest: {
          name: '年齢計算',
          short_name: '年齢計算',
          description: '生年月日から年齢・和暦・西暦・干支を表示します',
          lang: 'ja',
          start_url: base,
          scope: base,
          display: 'standalone',
          background_color: '#f5f7fb',
          theme_color: '#2f5fd0',
          icons: [
            { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
            {
              src: 'icon-maskable-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
      }),
    ],
  };
});
