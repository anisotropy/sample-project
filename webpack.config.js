var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require('./config.js');

module.exports = {
	devtool: 'eval-source-map',
	entry: config.entry,
	output: {
		path: __dirname + '/build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.json$/, loader: 'json' },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['react'] }},
			{ test: /\.less$/, loader: 'style-loader!css-loader!postcss-loader!less' },
			{ test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' }
		]
	},
	postcss: function(){
		return [require('autoprefixer')];
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + '/app/index.tmpl.html'
		}),
		new webpack.ProvidePlugin(config.globalModules)
	]
}
