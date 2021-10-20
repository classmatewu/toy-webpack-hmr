const path = require('path')

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
        filename : 'bundle.[hash:8].js',
        path : path.join(__dirname, './dist')
    },
}
