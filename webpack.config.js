const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	// mode: env.development ? 'development' : 'production',
	entry: path.resolve(__dirname, "./src/index.js"),
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "deploy/")
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader"
			}
		},
		{
			test: /\.html$/,
			use: {
				loader: "html-loader"
			}
		},
		{
			test: /\.(sa|sc|c)ss$/,
			use: ["style-loader", "css-loader", "sass-loader"]
		}]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: path.resolve(__dirname, "./src/index.html")
		})
	]
};