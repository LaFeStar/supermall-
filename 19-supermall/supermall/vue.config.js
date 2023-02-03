const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('network', resolve('src/network'))
  }
}

// module.exports = {
//   configureWebpack: {
//     resolve: {
//       alias: {
//         '@': resolve('src'),
//         'views': resolve('src/views'),
//         'assets': resolve('src/assets'),
//         'components': resolve('src/components'),
//         'network': resolve('src/network'),
//       }
//     }
//   }
// }

