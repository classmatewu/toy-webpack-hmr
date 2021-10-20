const express = require('express')
const webpack = require('webpack')
const config = require('../webpack.config')

const app = new express()
const compiler = webpack(config)

let changeNum = 0
compiler.watch({/** watchOptions **/}, () => {
  console.log('change ... ');
  changeNum++
})

app.use((req, res, next) => {
  console.log('hhh');
  res.send({
    code: 0,
    msg: 'success',
    data: changeNum
  })
})

app.listen('3322', () => {
  console.log('127.0.0.1:3322');
})