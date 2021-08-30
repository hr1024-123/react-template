const webpackConfig = require('./internals/webpack')

const { createServer, plugins } = webpackConfig
// 命令行解析
const { serve = 'online' } = require('minimist')(process.argv.slice(2))

module.exports = {
  devServer: {
    proxy: createServer(serve)
  },
  plugins
}
