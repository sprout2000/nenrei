import path from 'path';
import { Configuration } from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';

const isDev = process.env.NODE_ENV === 'development';

const config: Configuration = {
  mode: isDev ? 'development' : 'production',
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    publicPath: '',
    filename: '[name].js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(ico|gif|jpe?g|png|svg|ttf|otf|eot|woff?2?|mp3)$/,
        type: isDev ? 'asset/inline' : 'asset/resource',
      },
    ],
  },
  plugins: isDev
    ? [
        new CopyPlugin({
          patterns: [{ from: 'assets', to: '.' }],
        }),
        new HtmlPlugin({
          template: './src/index.html',
          favicon: './src/favicon.ico',
          minify: !isDev,
          inject: 'body',
          scriptLoading: 'defer',
        }),
      ]
    : [
        new CopyPlugin({
          patterns: [{ from: 'assets', to: '.' }],
        }),
        new HtmlPlugin({
          template: './src/index.html',
          favicon: './src/favicon.ico',
          minify: !isDev,
          inject: 'body',
          scriptLoading: 'defer',
        }),
        new WorkboxPlugin.GenerateSW({
          swDest: 'service-worker.js',
          sourcemap: false,
          skipWaiting: true,
          clientsClaim: true,
          inlineWorkboxRuntime: true,
        }),
      ],
  stats: 'errors-only',
  performance: { hints: false },
  devServer: {
    port: 1234,
    open: true,
    static: {
      directory: path.resolve(__dirname, 'docs'),
    },
  },
  devtool: isDev ? 'inline-source-map' : undefined,
};

export default config;
