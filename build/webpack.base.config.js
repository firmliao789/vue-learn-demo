const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");

const resolve = (file) => {
    return path.join(__dirname, '..', file);
}
module.exports = {
    entry: {
        "my-vue": resolve('./src/index.js'),
        "index": resolve('./test/index.js')
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
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jpg)/,
                use: [{
                    'loader': 'url-loader',
                    options: {
                        limit: 100,
                        name: 'img/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.css/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 1}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './build/postcss.config.js'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 1}
                    },
                    'sass-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './build/postcss.config.js'
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].[contenthash].css",
            chunkFilename: "[id].css"
        }),
        new PurifyCSSPlugin({
            //这里配置了一个paths，主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。
            paths: glob.sync(path.join(__dirname, '..', 'index.html')),
        })
    ],
    resolve: {
        extensions: ['.js'],
        alias: {}
    }
}
