/* eslint-disable @typescript-eslint/no-var-requires */
const { Config } = require('webpack-config')

module.exports = new Config()
  .merge({
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json']
    },
  })