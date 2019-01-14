三个部分：

1、webpack4基础

2、创建基础webpack打包配置。

3、开发环境webapck配置，以及热调试，开发dev.server等。

4、生产环境webpack配置。



一、webpack4基础

1、安装webpack

npm install webpack webpack-cli webpack-dev-server -g(如果是mac电脑请使使用sudo超级管理员)

2、创建项目的基础目录

mkdir build dist src 三个目录(window电脑，不支持linux命令，请手动创建)

3、npm初始化package.json文件

npm init -y

4、创建入口文件index.js

在src/下面创建index.js入口文件

5、终端到当前项目，输入webpack，会看到在./dist文件夹下多出了一个main.js打包好的文件。

从 webpack v4.0.0 开始，可以零配置使用，默认打包./src/index.js文件为入口文件。

6、设置mode，刚刚打包后的终端会出现一个警告：

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/

webpack有两种打包环境，一个是开发环境：development另外一个是生产环境：production，分别会对打包结果做相应优化，production模式下的打包结果会小很多。
打包的时候输入webpack --mode=development或者webpack --mode=production就不会出现警告提示了



二、创建基础webpack打包配置。

1、在build文件下创建webapck.base.config.js文件

文件内容：

module.exports={

    //入口文件配置

    entry:{},

    //出口文件配置

    output:{},

    module:{

        //loader配置

        rules:[]

    },

    //插件配置   

    plugins:[],

    //webpack中模块的解析规则

    resolve:[

        //别名

        alias:[],

        //此选项告诉解析器在解析中能够接受哪些扩展名

        extensions：[]

    ]

}

2、根据上面框架一一来配置

（1）、webpack的路径都是绝对路径所以需要引入node的path模块帮助我们来设置中路径

    (1)、npm i path --D

    (2)、定义一个resolve函数

const resolve=(file)=>path.jion(__dirname,'..',file);

（2）、入口:entry:[resolve(./src/index.js")]

（3）、出口:output={

                    filename:'[name].bundle.js',//打包后的文件名称，name使用占位符来命名[name]

            path:reslove("./dist"),//输出文件夹

            publicPath:'/'//虚拟目录

                }

（4）、rules打包规则配置

js配置:es6转es5

npm install babel-core babel-loader --D

{

    test:/\.js/,

    loader:'babel-loader'

}

.babelrc文件

{

    "preset":["env"]

}

css配置

npm install css-loader style-loader --D

{

    test:/\.css/,

    loader:'style-loader!css-loader'

}

scss配置

npm install sass-loader node-sass --D



{

    test:/\.scss/,

    loader:'style-loader!css-loader!sass-loader'

}
css文件分离

mini-css-extract-plugin --D

const MiniCssExtractPlugin = require("mini-css-extract-plugin");



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

                    'css-loader'

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

                    'css-loader',

                    'sass-loader'

                ]

            }

plugins=[

    new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "css/[name].[contenthash].css",
    chunkFilename: "[id].css"
    })

]

自动处理CSS3属性前缀

npm i npm install --save-dev postcss-loader autoprefixer --D

在build下新增文件postcss.config.js

module.exports = {
    plugins: [
        require('autoprefixer')()
    ]

}

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

消除未使用的CSS

npm install purifycss-webpack purify-css --save-dev

const glob = require('glob');

new PurifyCSSPlugin({

    //这里配置了一个paths，主要是需找html模板，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。

    paths: glob.sync(path.join(__dirname, 'src/*.html'))

})

图片处理

npm i url-loader file-loader --D

{
    test: /\.(png|jpg)/,
    use: [{
        'loader': 'url-loader',
        options: {
            limit: 100,
            name: 'img/[name].[ext]'
        }
    }]

}



二、开发环境webapck配置，以及热调试，开发dev.server

创建webpack.dev.config

npm i webpak-merge --D

const webpackConfig = require('./webpack.base.config');

const webpack = require('webpack');

const merge = require('webpack-merge');



module.exports = merge(webpackConfig, {

    devtool: '#source-map',

    mode: 'development',

})

package.json scripts配置

"dev":"node ./build/dev.server.js"

创建dev.server.js

npm i webpack-dev-middleware webpack-hot-middleware express  opn --D

利用express和webpack-dev-middleware、webpack-hot-middleware中间件搭建一个热更新开发环境

const path = require('path');

const express = require('express');

const opn = require('opn');

const webpack = require('webpack');

const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackDevMiddleware = require('webpack-dev-middleware');

const webpackConfig = require('./webpack.dev.config');

const app = express();

const compiler = webpack(webpackConfig);

//初始化中间件

const devMiddleware = webpackDevMiddleware(compiler, {

    noInfo: true,

    publicPath: '/',

    hot: true

});

const hotMiddleware = webpackHotMiddleware(compiler, {

    log: () => {

    },

    heartbeat: 2000

});

//使用中间件

app.use(devMiddleware);

app.use(hotMiddleware);

app.use(express.static(path.join(__dirname, './dist')));

const port = 9999;

//监听port端口

app.listen(port, () => {

    //自定打开浏览器

    opn(`http://localhost:${port}`);

})

二、生产环境webpack配置

创建webpack.pro.config.js

npm i uglifyjs-webpack-plugin --D

const webpack = require('webpack');

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

package.json scripts配置

"build":"rm -rf ./dist && webpack --config ./build/webpack.pro.config.js --progress"






