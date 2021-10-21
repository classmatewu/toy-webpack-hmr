const express = require('express')
const path = require('path')
const http = require('http')
const webpack = require('webpack')
const socketIo = require('socket.io')
const config = require('../webpack.config')
const MemoryFS = require('memory-fs')
const mfsStatic = require('./middlewares/mfsStatic')

// 这里利用express + http 模块来创建一个 Server的原因是，
// 如果单纯express，拿不到server，如果单纯http，太难整了
// 所以两者结合，利用http Server api，拿到express的server
const app = new express() // 用express启一个http server app
const server = http.Server(app) // 拿到server实例
const io = socketIo(server) // new 一个websocket实例

io.on('connection', (socket) => {
  console.log('connection ok');
  socket.emit('hash', { hello: 'world' });
  socket.on('ok', (data) => {
    console.log(data);
  });
});

const compiler = webpack(config) // 利用webpack的node API，传入配置参数，获取webpack实例
const mfs = new MemoryFS() // 
compiler.outputFileSystem = mfs

/**
 * 利用webpack watch API，监听项目modules变化，重新执行编译
 */
compiler.watch({/** watchOptions **/}, () => {})

// compiler.run((err, stats) => {/* ...处理结果 */})

/**
 * 托管静态文件，将含有打包bundle.hash.js的html文件作为首页默认返回
 */
app.use(mfsStatic(mfs, path.resolve(__dirname, '../dist')))
// app.use(express.static(path.resolve(__dirname, '../dist')))


/**
 * 监听端口
 */
server.listen('3322', () => {
  console.log('127.0.0.1:3322');
})