import path from 'path';
import pjson from './package.json';
import { generateSW } from 'workbox-build';
import { build, BuildFailure, BuildResult } from 'esbuild';

const isDev = process.env.NODE_ENV === '"development"';

const warningLog = (
  warnings: BuildFailure['warnings'] | BuildResult['warnings']
) => {
  warnings.map((warn) => {
    console.error(`warning: ${warn.text}`);
    console.error(`detail: ${warn.detail}`);
    console.error(
      `path: ${warn.location?.file}:${warn.location?.line}:${warn.location?.column}`
    );
    console.error(` -> ${warn.location?.lineText}`);
  });
};

const errorLog = (errors: BuildFailure['errors']) => {
  errors.map((err) => {
    console.error(`error: ${err.text}`);
    console.error(
      `path: ${err.location?.file}:${err.location?.line}:${err.location?.column}`
    );
    console.error(` -> ${err.location?.lineText}`);
  });
};

const esbuild = async () => {
  const startAt = Date.now();
  const version = pjson.devDependencies.esbuild;

  build({
    define: { 'process.env.NODE_ENV': process.env.NODE_ENV as string },
    target: 'es6',
    platform: 'browser',
    entryPoints: ['src/main.tsx'],
    outdir: path.resolve(__dirname, 'public'),
    bundle: true,
    minify: !isDev,
    sourcemap: isDev,
    loader: {
      '.png': 'file',
      '.woff': 'file',
      '.woff2': 'file',
    },
    watch: isDev
      ? {
          onRebuild: (err, result) => {
            console.log('==============================');
            if (err) {
              console.error(
                new Date().toLocaleString(),
                ' watch build failed.'
              );
              if (err.warnings) warningLog(err.warnings);
              if (err.errors) errorLog(err.errors);
            } else {
              console.log(
                new Date().toLocaleString(),
                ' watch build suceeded.'
              );
              if (result?.warnings) warningLog(result.warnings);
            }
          },
        }
      : false,
  }).then(() => {
    console.log(
      `esbuild ${version} compiled successfully in ${Date.now() - startAt} ms`
    );
    if (isDev) console.log('Watching...');
  });
};

esbuild().then(() => {
  if (!isDev) {
    generateSW({
      swDest: path.resolve(__dirname, 'public/service-worker.js'),
      globDirectory: path.resolve(__dirname, 'public'),
      clientsClaim: true,
      skipWaiting: true,
      sourcemap: false,
    });
  }
});
