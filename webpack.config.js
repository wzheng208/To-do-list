const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const e = require('express');

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  devServer: {
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    proxy: {
    //   '/users': {
    //     target: 'http://localhost:8080/',
    //     router: () => 'http://localhost:3000',
    //   },
    //   '/transactions': {
    //     target: 'http://localhost:8080/',
    //     router: () => 'http://localhost:3000',
    //   }
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/index.html'),
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: [
            'style-loader',
            'css-loader', 
            {
              loader: 'sass-loader'
            }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};