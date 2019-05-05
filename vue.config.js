const CompressionPlugin = require('compression-webpack-plugin')
const hljs = require('highlight.js')

const path = require('path')
const IS_PROD = process.env.NODE_ENV === 'production'
const cdnDomain = '/'

module.exports = {
  publicPath: IS_PROD ? cdnDomain : '/',
  assetsDir: 'assets',
  configureWebpack: () => ({
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.ts', '.vue', '.json'],
      alias: {
        'components': path.resolve('./src/components'),
        'views': path.resolve('./src/views'),
        'api': path.resolve('./src/api'),
        '~styles': path.resolve('./src/assets/styles'),
        '@elementui': path.resolve('./src/plugins/@elementui.js')
      }
    }
  }),
  chainWebpack: config => {
    // 这里是对环境的配置，不同环境对应不同的BASE_URL，以便axios的请求地址不同
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })

    // 处理引入的svg
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加 svg 新的 loader 处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(path.resolve('src/assets/icons'))

    // markdown文件处理
    const mdRule = config.module.rule('md')
    mdRule
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
        preventExtract: true,
        use: [
          [
            require("markdown-it-container"),
            "demo",
            {
              validate: function(params) {
                return params.trim().match(/^demo\s+(.*)$/)
              },
              render(tokens, index) {
                let { nesting, info } = tokens[index]
                if (nesting === 1) {
                  // 1.获取代码块的描述内容
                  let content = info.trim().match(/^demo\s+(.*)$/) || []
                  let description = content.length > 1 ? content[1] : ""
                  var md = require("markdown-it")()
                  if (description) {
                    description = md.render(description)
                  }
                  // 2.获取代码块内的 html 和 js代码
                  content = tokens[index + 1].content
                  // 3.代码块包裹
                  return  `<code-demo>
                    <div class="source" slot="source">${content}</div>
                    ${descriptionHTML}
                    <div class="highlight" slot="highlight">
                  `
                } else {
                  return `</div></code-demo>\n`
                }
              }
            }
          ]
        ]
      })

    if (process.env.NODE_ENV === 'production') {
      // 启用GZip压缩
      config
        .plugin('compression')
        .use(CompressionPlugin, {
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          cache: true
        })
        .tap(args => { })
    }
    // 忽略生成环境打包的文件
    // var externals = {
    //   vue: 'Vue',
    //   axios: 'axios',
    //   'element-ui': 'ELEMENT',
    //   'vue-router': 'VueRouter',
    //   vuex: 'Vuex'
    // }
    // config.externals(externals)
    const cdn = {
      css: [
        // element-ui css
        '//unpkg.com/element-ui/lib/theme-chalk/index.css'
      ],
      js: [
        // vue
        '//cdn.staticfile.org/vue/2.5.22/vue.min.js',
        // vue-router
        '//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
        // vuex
        '//cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
        // axios
        '//cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
        // element-ui js
        '//unpkg.com/element-ui/lib/index.js'
      ]
    }
    config.plugin('html')
      .tap(args => {
        args[0].cdn = cdn
        return args
      })
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  devServer: {
    // 自动打开默认浏览器
    open: true,
    hot: true,
    // 设置端口
    port: 9555,
    https: false,
    hotOnly: false,
    // 设置单个代理
    // proxy: '',
    // 配置多个代理
    // proxy: { 
    //   "/api": {
    //     target: "http://192.168.5.64:9555",
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  }
}
