module.exports = {
  devtool: 'source-map',
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.mp4$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  }
};
