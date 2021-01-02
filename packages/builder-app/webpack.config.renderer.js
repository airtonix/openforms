/* eslint-disable @typescript-eslint/no-var-requires */
const Config =  require('webpack-config').Config
require('./webpack.config.base')

module.exports = new Config()
  .extend('@openforms/builder-app/webpack.rules.node')
  .extend('@openforms/builder-app/webpack.rules.typescript.[env]')
  .extend('@openforms/builder-app/webpack.rules.css')
  .extend('@openforms/builder-app/webpack.plugins.typescript')
  .extend('@openforms/builder-app/webpack.resolve')
