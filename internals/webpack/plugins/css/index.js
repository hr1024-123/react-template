const CracoLessPlugin = require('craco-less')

module.exports = {
  plugin: CracoLessPlugin,
  options: {
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        sourceMap: true,
        modifyVars: {
          'primary-color': '#27A9DA',
          'table-padding-vertical': '10px',
          'table-padding-horizontal': '8px'
        }
      }
    },
    cssLoaderOptions: {
      modules: {
        localIdentName: '[name]-[hash:base64:5]'
      }
    }
  }
}
