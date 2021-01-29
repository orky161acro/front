const path = require('path');
const webpackConfig = require('./webpack.config.js');
module.exports = env =>
  Object.assign(webpackConfig(env), {
    devtool: 'source-map',
    output: {
      pathinfo: true,
      path: path.resolve(__dirname, 'build'),
      filename: 'tweetmotion.bundle.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      port: 9000
    },
    watch: true
});
