import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';

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
    new GenerateSW({
      swDest: 'service-worker.js',
      skipWaiting: true,
      clientsClaim: true,
      inlineWorkboxRuntime: true,
      runtimeCaching: [
        {
          urlPattern: /\.(png|ico|js|html)$/,
          handler: 'NetworkFirst',
        },
      ],
    }),
  ],
  optimization: {
    minimize: !isDev,
    minimizer: [new TerserWebpackPlugin()],
  },
  stats: 'errors-only',
  devtool: isDev ? 'inline-source-map' : undefined,
  performance: { hints: false },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 7890,
    open: true,
  },
};

export default config;
