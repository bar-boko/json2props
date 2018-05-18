import 'webpack';
import {join} from 'path';

const srcPath = join(__dirname, 'src');
const distPath = join(__dirname, 'dist');

export default {
  context: srcPath,
  entry: {
    app: 'index.ts',
  },
  output: {
    path: distPath,
    filename: 'bundle.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [srcPath],
        loader: 'ts-loader',
      },
      {
        test: /\.js$/,
        include: [srcPath],
        loader: 'babel-loader',
      },
    ],
  },
  devtool: 'source-map',
};
