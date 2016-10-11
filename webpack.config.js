var Path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const path = {
  client: {
    source: Path.join(__dirname, "src/client"),
    dist: Path.join(__dirname, "dist/public")
  },
  server: {
    source: Path.join(__dirname, "src/server"),
    dist: Path.join(__dirname, "dist/server")
  }
}

module.exports = {
  entry: Path.join(path.client.source, 'client.jsx'),
  output: {
    filename: 'client-bundle.js',
    path: path.client.dist
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: Path.join(path.client.source, 'index-template.html'),
      filename: 'index.html'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.html']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.client.source
      },
    ]
  }
};