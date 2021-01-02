/* eslint-disable @typescript-eslint/no-var-requires */
const { Config } = require('webpack-config')

module.exports = new Config()
    .merge({
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
                }
            ]
        }
    })