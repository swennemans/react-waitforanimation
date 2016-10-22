const webpack = require("webpack");

module.exports = {
  entry: './example/src/index.js',
  devtool: 'eval-source-map',
  output: {
    // path: __dirname + '/example/build', 
    fileName: 'bundle.js',
    // publicPath: __dirname + '/example'
  },
  module: {
    loaders: [
      {
            test: /\.js/,
            exclude: /node_modules/,
            loader: 'babel'
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
          ]
      }],
  },
  devServer: {
        inline: true,
        port: 4000,
        contentBase: './example'
    },
}
