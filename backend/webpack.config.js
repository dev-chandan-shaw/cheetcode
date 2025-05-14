const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const envMode = process.env.NODE_ENV || "production" //"development" | "production" | "none"

module.exports = {
    entry: './dist/index.js',
    devtool: 'inline-source-map',
    mode: envMode,
    output: {
        path: path.resolve(__dirname, `build/${envMode}`),
        filename: 'api.bundle.js'
    },
    target: 'node',
    node: {
        __dirname: false
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                './node_modules/swagger-ui-dist/swagger-ui.css',
                './node_modules/swagger-ui-dist/swagger-ui-bundle.js',
                './node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js',
                './node_modules/swagger-ui-dist/favicon-16x16.png',
                './node_modules/swagger-ui-dist/favicon-32x32.png'
            ]
        })
    ]
};