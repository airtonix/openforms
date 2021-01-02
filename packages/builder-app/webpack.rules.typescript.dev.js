/* eslint-disable @typescript-eslint/no-var-requires */
const { Config } = require('webpack-config')

module.exports = new Config()
    .merge({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /(node_modules|\.webpack)/,
                    use: {
                      loader: 'ts-loader',
                      options: {
                        transpileOnly: true
                      }
                    }
                }
            ]
        }
    })