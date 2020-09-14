const path = require('path');

module.exports = {
    mode: 'development',
    entry: './scripts/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../public'),
        // publicPath: '../public',
    },
    devtool: 'inline-source-map',
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
    },
};
