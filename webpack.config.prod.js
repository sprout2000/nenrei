const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/** @type import('webpack').Configuration */
module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(bmp|gif|png|jpe?g|svg|ttf|eot|woff?2?)$/,
        loader: 'file-loader',
        options: {
          name: 'icons/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({}),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/favicon.ico',
      filename: 'index.html',
    }),
    new WebpackPwaManifest({
      name: 'ウェブ年齢計算機',
      short_name: '年齢計算',
      description: 'ウェブで年齢計算が出来ます',
      start_url: 'index.html',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#efeff4',
      theme_color: '#ff375f',
      icons: [
        {
          src: path.resolve('src/assets/icon-512.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: 'icons',
          ios: true,
        },
      ],
      ios: {
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black',
        'apple-mobile-web-app-title': '年齢計算',
      },
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: 'service-worker.js',
      skipWaiting: true,
      clientsClaim: true,
    }),
  ],
  performance: {
    hints: false,
  },
};
