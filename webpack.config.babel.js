import { BannerPlugin } from 'webpack';
import { join } from "path";

const srcPath = join(__dirname, "src");
const distPath = join(__dirname, "dist");

export default ({
  context: srcPath,
  target: 'node',
  entry: {
    app: "./index.js"
  },
  output: {
    path: distPath,
    filename: "./bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [srcPath],
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".json"]
  },
  plugins: [
    new BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
  devtool: "eval-source-map"
});