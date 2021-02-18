import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';

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
    path: path.resolve(__dirname, 'public'),
    publicPath: '',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: 'assets', to: '.' }] }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico',
      inject: 'body',
      scriptLoading: 'defer',
      minify: !isDev,
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: 'service-worker.js',
      skipWaiting: true,
      clientsClaim: true,
    }),
  ],
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.cache'),
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 7890,
    open: true,
  },
  devtool: isDev ? 'inline-source-map' : false,
  stats: 'errors-only',
  performance: { hints: false },
};

export default config;
