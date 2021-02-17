import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';

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
    assetModuleFilename: 'images/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.(ico|gif|jpe?g|png|svg|ttf|otf|eot|woff?2?)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: isDev
    ? [
        new CopyWebpackPlugin({ patterns: [{ from: 'assets', to: '.' }] }),
        new HtmlWebpackPlugin({
          template: './src/index.html',
          favicon: './src/favicon.ico',
          inject: 'body',
          scriptLoading: 'blocking',
          minify: false,
        }),
      ]
    : [
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({ patterns: [{ from: 'assets', to: '.' }] }),
        new HtmlWebpackPlugin({
          template: './src/index.html',
          favicon: './src/favicon.ico',
          inject: 'body',
          scriptLoading: 'defer',
          minify: true,
        }),
        new WorkboxWebpackPlugin.GenerateSW({
          swDest: 'service-worker.js',
          skipWaiting: true,
          clientsClaim: true,
        }),
      ],
  cache: isDev
    ? {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, '.cache'),
      }
    : false,
  optimization: {
    minimize: isDev ? false : true,
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 7890,
    open: true,
  },
  devtool: isDev ? 'source-map' : false,
  stats: 'errors-only',
  performance: { hints: false },
};

export default config;
