const webpack = require('webpack');
const path = require('path');

const BUNDLE_HEADER = `
Entity-Relationship Diagram Code Generator v1.0.5
https://github.com/nestorrente/er-diagram-code-generator

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
