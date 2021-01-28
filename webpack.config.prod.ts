import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';

const config: Configuration = {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  entry: {
    app: path.join(__dirname, 'src', 'main.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: 'auto',
    filename: '[name].js',
    assetModuleFilename: 'images/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(bmp|gif|ico|png|jpe?g|svg|ttf|otf|eot|woff?2?)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      favicon: path.join(__dirname, 'src', 'favicon.ico'),
      inject: 'body',
      scriptLoading: 'blocking',
      minify: true,
    }),
    new CopyWebpackPlugin({ patterns: [{ from: 'assets', to: '.' }] }),
    new MiniCssExtractPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: 'service-worker.js',
      skipWaiting: true,
      clientsClaim: true,
    }),
  ],
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()],
  },
  performance: {
    hints: false,
  },
};

export default config;
