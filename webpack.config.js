const path = require('path');
const webpack = require('webpack');

const paths = {
	app: path.join(__dirname, 'client'),
	build: path.join(__dirname, 'dist')
};

module.exports = {
	devtool: 'eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		paths.app
	],

	output: {
		path: paths.build,
		filename: 'bundle.js',
		publicPath: '/static/'
	},

	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: __dirname
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	}
};
