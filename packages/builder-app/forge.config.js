module.exports = {
    "packagerConfig": {},
    "makers": [
        {
            name: '@electron-forge/maker-flatpak',
            "platforms": [
              "linux"
            ],
            config: {
                options: {
                    categories: ['Office'],
                }
            }
        }
    ],
    plugins: [
        ['@electron-forge/plugin-webpack', {
            port: 3030,
            mainConfig: './webpack.config.main.js',
            renderer: {
                config: './webpack.config.renderer.js',
                entryPoints: [{
                    html: './src/index.html',
                    js: './src/index.ts',
                    name: 'main_window'
                }]
            },
            "loggerPort": "9001"
        }]
    ]
}
