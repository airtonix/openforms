/* eslint-disable @typescript-eslint/no-var-requires */
const Config =  require('webpack-config').Config
require('./webpack.config.base')

module.exports = new Config()
  .merge({
    /**
     * This is the main entry point for your application, it's the first file
     * that runs in the main process.
     */
    entry: './src/index.ts',
  })
  .extend('webpack.rules.node.js')
  .extend('webpack.rules.typescript.[env].js')
  .extend('webpack.rules.css.js')
  .extend('webpack.plugins.typescript.js')
  .extend('webpack.resolve.js')
