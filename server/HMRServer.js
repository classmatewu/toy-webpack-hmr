const express = require('express')
const http = require('http')
const socket = require('socket.io')
const MemoryFileSystem = require("memory-fs");
const webpackDevMiddleware = require('./middlewares/webpack-dev-middleware')

class HMRServer {
  /**
   * @description 构造方法
   */
  constructor(compiler) {
    this.compiler = compiler
    this.mfs = new MemoryFileSystem() // 利用 memory-fs，新建一个内存文件系统
    this.app = new express() // 用express启一个http server app
    this.httpServer = this._createHttpServer(this.app)
    this.socketServer = this._creatSocketServer(this.httpServer)
    this._webpackDevMiddleware(this.app, this.compiler, this.mfs)
  }

  /**
   * @description 制定http server监听端口
   */
  listen(port, cb = () => {}) {
    this.httpServer.listen(port, cb)
  }

  /**
   * @description 利用express + http模块，拿到一个http server
   * @why express + http => server
   *  - 这里利用express + http 模块来创建一个 Server的原因是，
   *  - 如果单纯express，拿不到server，如果单纯http，太难整了
   *  - 所以两者结合，利用http Server api，拿到express的server
   */
  _createHttpServer(app) {
    const httpServer = http.Server(app) // 利用http模块，拿到espress server实例
    return httpServer
  }

  /**
   * @description 创建一个socket server
   * @param {object} httpServer 由于socket server的握手跟http是一样的，所以这里基于http server
   */
  _creatSocketServer(httpServer) {
    const io = socket(httpServer)

    io.on('connection', (socket) => {
      console.log('connection success');
      socket.emit('haha', () => {}) // 发射事件
      socket.on('xixi', () => {}) // 监听事件
    })
  }

  /**
   * @description 实现 webpack-dev-middleware 的功能
   *  - 1. 启动 webpack 的 watch 功能，对磁盘文件进行监听与重新编译
   *  - 2. 利用内存文件系统，文件读取不在磁盘，而在内存中，提升读写效率
   *  - 3. 由于是内存文件系统，所以挂载静态文件不能再是利用express.status，而是需要利用mfs，去读写内存文件
   */
  _webpackDevMiddleware(app, compiler, mfs) {
    webpackDevMiddleware(app, compiler, mfs)
  }
}

module.exports = HMRServer