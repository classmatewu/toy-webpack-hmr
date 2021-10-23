/**
 * @description 手写一个 webpack-dev-middleware 中间件
 *  - 1. 启动 webpack 的 watch 功能，对磁盘文件进行监听与重新编译
 *  - 2. 利用内存文件系统，文件读取不在磁盘，而在内存中，提升读写效率
 *  - 3. 由于是内存文件系统，所以挂载静态文件不能再是利用express.status，而是需要利用mfs，去读写内存文件
 */

const mfsStatic = require('./mfsStatic')

const webpackDevMiddleware = (app, compiler, mfs) => {
  /**
   * 利用webpack watch api，监听文件变化，并重新打包
   */
  compiler.watch({/** watch options **/}, () => {
    console.log('webpack compiler again');
  })

  /**
   * 将 webpack 的磁盘文件系统改为内存文件系统
   */
  compiler.outputFileSystem = mfs

  /**
   * 利用mfs，读取内存中的静态资源文件内容
   */
  const outputAbsPath = compiler.options.output.path
  app.use(mfsStatic(mfs, outputAbsPath))
}

module.exports = webpackDevMiddleware