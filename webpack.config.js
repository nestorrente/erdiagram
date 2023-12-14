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
            {
                test: /\.(sql|txt)$/,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin()
        ],
        fallback: {
            fs: false,
            path: false
        }
    },
    plugins: [
        new webpack.BannerPlugin({banner: BUNDLE_HEADER})
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
    }
};

const standaloneConfig = {
    ...commonConfig,
    entry: './src/main/standalone-entry.js',
    output: {
        ...commonConfig.output,
        filename: 'erdiagram.js',
        library: 'ERDiagram',
        libraryTarget: 'var',
        libraryExport: 'default'
    }
};

const moduleConfig = {
    ...commonConfig,
    entry: './src/main/module-entry.ts',
    output: {
        ...commonConfig.output,
        filename: 'erdiagram.umd.js',
        libraryTarget: 'umd',
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    }
};

module.exports = [
    standaloneConfig,
    moduleConfig
];
