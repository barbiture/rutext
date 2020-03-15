const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackBaseConfig = require('./webpack.common.config');
module.exports = merge(webpackBaseConfig, {
	optimization: {
		minimizer: [
			new UglifyJsPlugin(),
			new OptimizeCssAssetsPlugin()
		]
	}
});
