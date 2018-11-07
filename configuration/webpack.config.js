const path = require('path');

const root = path.resolve(__dirname, '..');
const srcPath = path.join(root, 'src');
const mode = process.env.NODE_ENV || 'production';

module.exports = {
    mode,
    entry: path.join(srcPath, 'index.js'),
    output: {
        filename: 'index.js',
        path: path.join(root, 'dist'),
        libraryTarget: 'umd',
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: srcPath,
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    }
};
