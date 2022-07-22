const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');

const isProductionMode = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProductionMode ? 'production' : 'development',
  entry: path.resolve(__dirname, './src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[hash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: {
                    version: 3,
                  },
                  targets: {
                    browsers: ['>= 1%, not dead'],
                  },
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `@import '@/assets/style/colors.scss'; @import '@/assets/style/reset.scss';`,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
      },
      {
        test: /\.(png|jpe?g|gif|otf|ttf)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
};
