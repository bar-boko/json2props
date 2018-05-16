import webpack from 'webpack';
import {join} from 'path';

const srcPath = join(__dirname, 'src');
const distPath = join(__dirname, 'dist');

export default {
	context: srcPath,
	entry: {
		app: 'index.js',
	},
	output: {
		path: distPath,
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [srcPath],
				loader: 'babel-loader',
			},
		],
	},
	devtool: debug ? 'source-map' : '',
};
