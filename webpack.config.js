const webpack = require('webpack');
const path = require('path');
const packageJson = require('./package.json');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const BUNDLE_HEADER = `
${packageJson.description} v${packageJson.version}
${packageJson.homepage}

Released under the MIT License.

Build date: ${new Date().toISOString()}
`.trim();

const commonConfig = {
	entry: './src/index.ts',
	devtool: 'source-map',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		plugins: [
			new TsconfigPathsPlugin()
		],
	},
	plugins: [
		new webpack.BannerPlugin({
			banner: BUNDLE_HEADER
		})
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
	}
};

const standaloneConfig = {
	...commonConfig,
	target: 'node',
	output: {
		...commonConfig.output,
		filename: 'er-diagram-code-generator.js',
		// library: 'EntityRelationshipDiagramCodeGenerator',
		// libraryTarget: 'var',
		// libraryExport: 'default'
	}
};

module.exports = [
	standaloneConfig
];
