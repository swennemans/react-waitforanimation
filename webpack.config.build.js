const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/WaitForAnimation.js',
    output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'index'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
            test: /\.js/,
            exclude: /build|node_modules/,
            loader: 'babel',
            include: path.join(__dirname, 'src')
      }],
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),
  ],
}
