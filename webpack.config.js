var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	entry: __dirname + '/app/content.js',
	output: {
		path: __dirname + '/build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.json$/, loader: 'json' },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
			{ test: /\.less$/, loader: 'style-loader!css-loader!postcss-loader!less' }
		]
	},
	postcss: function(){
		return [require('autoprefixer')];
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + '/app/index.tmpl.html'
		})
	]
}