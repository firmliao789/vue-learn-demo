const merge = require('webpack-merge');
const webpackConfig = require('./webpack.base.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = merge(webpackConfig, {
    mode: 'production',
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false,
                    drop_console: true,//console
                    pure_funcs: ['console.log']//移除console
                }
            },
            sourceMap: false,
            parallel: true
        })
    ]
})
