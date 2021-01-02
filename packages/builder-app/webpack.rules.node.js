/* eslint-disable @typescript-eslint/no-var-requires */
const { Config } = require('webpack-config')

module.exports = new Config()
    .merge({
        module: {
            rules: [
                // Add support for native node modules
                {
                    test: /\.node$/,
                    use: 'node-loader',
                },
                {
                    test: /\.(m?js|node)$/,
                    parser: { amd: false },
                    use: {
                    loader: '@marshallofsound/webpack-asset-relocator-loader',
                    options: {
                        outputAssetBase: 'native_modules',
                    },
                    },
                }
            ]
        }
    })