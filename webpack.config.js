// const {join} = require('path');
// import {join} from 'path';
const {join} = require('path');

const srcPath = join(__dirname, 'src');
const distPath = join(__dirname, 'dist');

module.exports = {
  context: srcPath,
  entry: {
    app: './index.ts',
  },
  output: {
    path: distPath,
    filename: './bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [srcPath],
        loader: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.js$/,
        include: [srcPath],
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.webpack.js', '.ts', '.web.js', '.js', '.json'],
  },
  devtool: 'eval-source-map',
};
