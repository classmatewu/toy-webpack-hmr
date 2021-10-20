const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  /**
   * 开发模式
   */
  mode : 'development',

  /**
   * 入口文件
   */
  entry : './src/index.js',

  /**
   * 打包出口
   */
  output : {
    filename : 'bundle.[chunkhash:8].js',
    path : path.join(__dirname, './dist'),
    // clean: true, // 代替CleanWebpackPlugin插件功能
  },

  /**
   * 插件
   */
  plugins:[
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'./src/index.html')
    }),
  ],
}
