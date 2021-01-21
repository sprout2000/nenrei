import { build } from 'esbuild';

build({
  define: { 'process.env.NODE_ENV': process.env.NODE_ENV as string },
  entryPoints: ['src/main.tsx'],
  outdir: 'public',
  bundle: true,
  minify: true,
  sourcemap: false,
  target: 'es2015',
  platform: 'browser',
}).catch(() => process.exit(1));
