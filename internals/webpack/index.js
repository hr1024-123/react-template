const plugins = require('./plugins')
const server = require('./server')

module.exports = {
  plugins,
  createServer: server.createServer
}
