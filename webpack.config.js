
module.exports = {
  entry: './modules/index.jsx',

  output: {
    filename: 'bundle.js',
    publicPath: ''
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