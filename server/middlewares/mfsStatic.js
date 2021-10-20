/**
 * @description 一个将静态文件托管在express http server上的中间件
 * @why
 *  express.static本身就是一个express的静态文件托管中间件，那为什么还需要再写一个呢？
 *  原因在于express.static是用的fs模块读取的磁盘上的文件，我们的HMR文件都是利用mfs存在内存上的
 * @how
 *  实现方式也很简单，利用mfs代替fs，将读取磁盘的文件改为读取内存，然后将文件返回给客户端
 */

const path = require('path')
// const MemoryFS = require('memory-fs')
// const mfs = new MemoryFS()
const mime = require("mime");

/**
 * @param {string} dirAbsPath 要托管的静态文件夹绝对路径
 * @returns {function} 返回一个中间件
 */
const mfsStatic = (mfs, dirAbsPath) => {
  return (req, res, next) => {
    const { url } = req
    let fileName = url

    // 处理特殊路径
    if (url === '/') { // 根路径默认返回index.html文件内容
      fileName = '/index.html'
    } else if (url === '/favicon.ico') { // 图标404
      res.sendStatus(404)
      return // 注意return，否则虽然HTTP链接断开了，但node服务逻辑还会继续往下走
    }

    try {
      const fileAbsPath = path.join(dirAbsPath, fileName)
      const content = mfs.readFileSync(fileAbsPath)
      res.setHeader("Content-Type", mime.getType(fileAbsPath))
      res.send(content)
    } catch (error) {
      res.sendStatus(404)
    }
  }
}

module.exports = mfsStatic