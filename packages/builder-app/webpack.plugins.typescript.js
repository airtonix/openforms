/* eslint-disable @typescript-eslint/no-var-requires */
const { Config } = require('webpack-config')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = new Config()
  .merge({
    plugins: [
      new ForkTsCheckerWebpackPlugin()
    ]
  })
