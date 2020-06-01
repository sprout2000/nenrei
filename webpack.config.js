const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

/** @type import('webpack').Configuration */
module.exports = {
  mode: isDev ? 'development' : 'production',
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
      favicon: './src/favicon.ico',
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'assets', to: '.' }],
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
  devtool: isDev ? 'inline-source-map' : false,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
  },
};
