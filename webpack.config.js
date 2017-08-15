var webpack = require('webpack')

module.exports = {
  entry: './modules/index.jsx',

  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [],

  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { 
        test: /\.jsx?$/, 
        loader: 'babel-loader'
      },

      {
        test: /\.scss$/,
        // use: [{
        loader: 'style-loader',
        // }, {
        loader: 'css-loader',
        // }, {
        loader: 'sass-loader',
        // }]
      }
    ]
  }
};