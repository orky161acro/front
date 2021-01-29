const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'src');
const resourcePrefix = 'TM_';

/**
 * Webpack Configuration
 */
module.exports = env => {
  return {
    mode: 'development',
    entry: path.resolve(dirApp, 'main.tsx'),
    resolve: {
      modules: [dirApp, dirNode],
      extensions: ['.js', '.json', '.jsx', '.ts', '.tsx']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(dirApp, 'index.ejs')
      })
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader'
        },
        // BABEL
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          include: [dirApp],
          options: {
            presets: ['react']
          }
        },

        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
        // STYLES
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },

        // IMAGES
        {
          test: /\.(jpe?g|png|gif)$/,
          loader: 'file-loader',
          options: {
            name: resourcePrefix + '[name].[ext]'
          }
        },

        // EJS
        {
          test: /\.ejs$/,
          loader: 'ejs-loader'
        },

        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    }
  };
};
