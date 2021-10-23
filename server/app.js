const webpack = require('webpack')
const config = require('../webpack.config')
const HMRServer = require('./HMRServer')

const compiler = webpack(config)
const app = new HMRServer(compiler)

app.listen('3322', () => {
  console.log('127.0.0.1:3322...');
})