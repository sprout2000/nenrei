import path from 'path';
import { Configuration } from 'webpack';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

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
        test: /\.s?css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: isDev },
          },
        ],
      },
      {
        test: /\.(ico|gif|jpe?g|png|svg|ttf|otf|eot|woff?2?|mp3)$/,
        type: isDev ? 'asset/inline' : 'asset/resource',
      },
    ],
  },
  plugins: isDev
    ? []
    : [
        new MiniCssExtractPlugin(),
        new WorkboxWebpackPlugin.GenerateSW({
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
    contentBase: path.resolve(__dirname, 'docs'),
    port: 8943,
  },
  devtool: isDev ? 'inline-source-map' : undefined,
};

export default config;
