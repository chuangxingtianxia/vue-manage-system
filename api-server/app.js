var path = require('path')
var express = require('express')
var mockjs = require('express-mockjs')
var devIp = require('dev-ip'); //用来获取本机ip地址
var app = express();
var host = devIp();

// 使用默认路径 '/'（不推荐）
// app.use(mockjs(path.join(__dirname, 'mocks')))

// 自定义路径 '/api'
app.use('/api', mockjs(path.join(__dirname, 'mocks')))


// 这里可以添加你的自定义代码.
app.listen(1006, function () {
    console.log('listening at http://'+host+':'+ 1001+"/api");
});