const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/** @type import('webpack').Configuration */
module.exports = {
  mode: 'development',
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
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
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
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico',
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'assets', to: '.' }],
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
  },
};
