// vue.config.js
const path = require('path');
const resolve = function (dir) {
  return path.join(__dirname, dir)
}
const isProduction = process.env.NODE_ENV === 'production'; //是否是生产环境

module.exports = {
    runtimeCompiler: true,
    productionSourceMap: !isProduction, //非生产环境才生成map文件
    outputDir: process.env.outputDir,
    chainWebpack: config => {
      config.resolve.alias
            .set('@', resolve('src'))
            .set('views',resolve('src/views'))
    },
  // webpack-dev-server 相关配置
  devServer: {
    host: 'localhost',
    port: '8801',
    hot: true,
    open: true,
    overlay: {
      warning: false,
      error: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};