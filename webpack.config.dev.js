const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'client/src/index.jsx')
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    stats: {
      chunks: false,
      color: true
    },
    contentBase: path.resolve(__dirname, 'client/src')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, include: path.join(__dirname, 'client/src'), loaders: ['babel-loader'] },
      { test: /\.(css)$|scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  },
  resolve: ['', '.js', '.jsx'],
};
