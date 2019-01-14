const path = require('path');
const express = require('express');
const opn = require('opn');
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');

const webpackConfig = require('./webpack.dev.config');
const app = express();
const compiler = webpack(webpackConfig);

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


app.use(devMiddleware);

app.use(hotMiddleware);

app.use(express.static(path.join(__dirname, './dist')));


const port = 9999;
app.listen(port, () => {
    opn(`http://localhost:${port}`);
})
