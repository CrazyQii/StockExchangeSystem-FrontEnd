module.exports = {
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,

    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    // compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {

    },

    configureWebpack: () => {},

    // css相关配置
    css: {
      loaderOptions: {}
    },

    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},

    // devServer: {
    //     proxy: 'http://127.0.0.1:5000'
    // },
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        disableHostCheck: true,
        host: '0.0.0.0',//如果是真机测试，就使用这个IP
        port: 8080,
        https: false,
        hotOnly: false,
        before: app => {}
    },

    // 第三方插件配置
    pluginOptions: {
        // ...
    },

    assetsDir: 'static'
}