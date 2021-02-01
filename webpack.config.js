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
        extensions: ['.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin()
        ],
    },
    plugins: [
        new webpack.BannerPlugin({banner: BUNDLE_HEADER})
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
    }
};

const standaloneLibConfig = {
    ...commonConfig,
    entry: './src/main/standalone-lib-entry-point.js',
    output: {
        ...commonConfig.output,
        filename: 'erdiagram.js',
        library: 'ERDiagram',
        libraryTarget: 'var',
        libraryExport: 'default'
    }
};

const moduleLibConfig = {
    ...commonConfig,
    entry: './src/main/exports.ts',
    output: {
        ...commonConfig.output,
        filename: 'erdiagram.esm.js',
        libraryTarget: 'umd'
    }
};

const cliConfig = {
    ...commonConfig,
    entry: './src/main/index.ts',
    target: 'node',
    output: {
        ...commonConfig.output,
        filename: 'erdiagram-cli.js'
    },
    stats: {
        warningsFilter: [
            './node_modules/yargs/index.js'
        ]
    }
};

module.exports = [
    standaloneLibConfig,
    moduleLibConfig,
    cliConfig,
];
