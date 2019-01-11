const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const resolve = (file) => {
    return path.join(__dirname, '..', file);
}
module.exports = {
    mode: "development",
    entry: {
        "my-vue": ['webpack-hot-middleware/client?noInfo=true&reload=true', resolve('./src/index.js')],
        "index": ['webpack-hot-middleware/client?noInfo=true&reload=true', resolve('./test/index.js')]
    },
    output: {
        path: resolve('./dist'),
        filename: '[name].bundle.js',
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: {
                    loader: 'babel-loader',
                    options: {presets: ['@babel/preset-env']}
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        extensions: ['.js'],
        alias: {}
    }
}
