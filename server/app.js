const express = require('express')
const path = require('path')
const webpack = require('webpack')
const config = require('../webpack.config')


/**
 * 用express启一个http server
 */
const app = new express()


/**
 * 利用webpack的node API，传入配置参数，获取webpack实例
 */
const compiler = webpack(config)


/**
 * 利用webpack watch API，监听项目modules变化，重新执行编译
 */
compiler.watch({/** watchOptions **/}, () => {})


/**
 * 托管静态文件，将含有打包bundle.hash.js的html文件作为首页默认返回
 */
app.use(express.static(path.resolve(__dirname, '../dist')))


/**
 * 监听端口
 */
app.listen('3322', () => {
  console.log('127.0.0.1:3322');
})