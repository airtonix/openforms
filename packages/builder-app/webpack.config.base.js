/* eslint-disable @typescript-eslint/no-var-requires */
const Config =  require('webpack-config').Config
const environment =  require('webpack-config').environment

environment.setAll({
    env: (config) => {
      return process.env.NODE_ENV || 'dev'
    }
})