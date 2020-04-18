const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin').GenerateSW;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');

/** @type import('webpack').Configuration */
module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  entry: {
    app: './src/App.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
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
    new BabelMinifyPlugin(),
    new MiniCssExtractPlugin({}),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico',
      chunks: ['app'],
      filename: 'index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets',
        to: '.',
        toType: 'dir',
        ignore: ['.DS_Store'],
      },
    ]),
    new WorkboxWebpackPlugin({
      swDest: 'service-worker.js',
      skipWaiting: true,
      clientsClaim: true,
    }),
  ],
  performance: {
    hints: false,
  },
};
