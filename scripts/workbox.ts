import { generateSW, GenerateSWConfig } from 'workbox-build';

const config: GenerateSWConfig = {
  globDirectory: 'public/',
  globPatterns: ['**/*.{html,json,js,css,ico,png}'],
  swDest: 'public/service-worker.js',
  skipWaiting: true,
  clientsClaim: true,
  sourcemap: false,
};

generateSW(config);
