const webpackConfig = require('./webpack.base.config');
const webpack = require('webpack');
const merge = require('webpack-merge');

const entry = () => {
    let entry = {};
    for (let key in webpackConfig.entry)
        entry[key] = ['webpack-hot-middleware/client?noInfo=true&reload=true', webpackConfig.entry[key]]
    return entry;
}

module.exports = merge(webpackConfig, {
    devtool: '#source-map',
    mode: 'development',
    entry: entry(),
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
})
