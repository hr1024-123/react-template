const serverMap = {
  online: 'http://218.246.21.184/',
  test: 'http://192.168.101.191:7200/'
}

function createServer (type) {
  return {
    context: ['/api/v3', '/image'],
    changeOrigin: true,
    target: serverMap[type]
  }
}

module.exports = { createServer }
