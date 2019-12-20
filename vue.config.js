const path = require('path');

module.exports = {
    chainWebpack: config => {
        config.module
            .rule('svg')
            .exclude
                .add(path.resolve('./src/assets/icons'))
                .end();

        config.module
            .rule('icon')
            .test(/\.svg$/)
            .include
                .add(path.resolve('./src/assets/icons'))
                .end()
            .use('svg-sprite-loader')
                .loader('svg-sprite-loader');
    }
};
