import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';

const isDev = process.env.NODE_ENV === 'development';

const config: Configuration = {
  mode: isDev ? 'development' : 'production',
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  entry: {
    app: './src/main.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    publicPath: '',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|tests|mocks)/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: isDev
    ? [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          favicon: './src/favicon.ico',
          inject: 'body',
          scriptLoading: 'defer',
          minify: !isDev,
        }),
        new CopyWebpackPlugin({
          patterns: [{ from: 'assets', to: '.' }],
        }),
      ]
    : [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          favicon: './src/favicon.ico',
          inject: 'body',
          scriptLoading: 'defer',
          minify: !isDev,
        }),
        new CopyWebpackPlugin({
          patterns: [{ from: 'assets', to: '.' }],
        }),
        new GenerateSW({
          swDest: 'service-worker.js',
          sourcemap: false,
          skipWaiting: true,
          clientsClaim: true,
          inlineWorkboxRuntime: true,
          runtimeCaching: [
            {
              urlPattern: /\.(js|css|html|ico|json)$/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'pages',
              },
            },
            {
              urlPattern: /\.png$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'assets',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 7,
                },
              },
            },
          ],
        }),
      ],
  stats: 'errors-only',
  performance: { hints: false },
  optimization: { minimize: !isDev },
  devtool: isDev ? 'inline-source-map' : undefined,
  devServer: {
    contentBase: path.resolve(__dirname, 'docs'),
    port: 7890,
    open: false,
  },
};

export default config;
