const {defineConfig} = require('@vue/cli-service')
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'ssl/key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'ssl/cert.pem')),
        },
    },
})
