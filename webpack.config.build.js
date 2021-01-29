const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env =>
  Object.assign(webpackConfig(env), {
    devtool: 'cheap-module-source-map',

    output: {
      path: path.join(__dirname, 'build'),
      filename: '[name].[chunkhash].js'
    },
    plugins: webpackConfig(env).plugins.concat([
      new CleanWebpackPlugin({ verbose: true, dry: false })
    ])
  });
