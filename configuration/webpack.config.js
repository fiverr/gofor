const {resolve, join} = require('path');

const base = resolve(__dirname, '..');
const mode = process.env.NODE_ENV || 'production';

module.exports = {
    mode,
    entry: base,
    output: {
        filename: 'index.js',
        path: join(base, 'dist'),
        libraryTarget: 'umd',
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: base,
                options: require('../.babelrc.js')
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    }
};
