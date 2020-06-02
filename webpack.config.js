// webpack.config.js
var path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
        }
      },
    ]
  },
  externals: {
    react: "react", // "commonjs2 react"
    antd: "antd",
  }
};