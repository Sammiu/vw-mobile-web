const Koa = require('koa')
const app = new Koa()
const fs = require('fs')
const path = require('path')
const favicon = require('koa-favicon')
const {createBundleRenderer} = require('vue-server-renderer')
/** 假设已经实现 */
const setupDevServer = require('./build/ssr/setup-dev-server')

const resolve = file => path.resolve(__dirname, file)

const createBundle = (bundle, clientManifest, template) => {
  return createBundleRenderer(bundle, {
    runInNewContext: false, /** 推荐 */
    template: template, /** 模板html文件 */
    clientManifest: clientManifest   /** client manifest */
  })
}

/** 根据环境变量赋值 */
let renderer
const templatePath = path.resolve(__dirname, './index.template.html')
const template = fs.readFileSync(templatePath, 'utf-8')
if (process.env.NODE_ENV === 'production') {
  /** 生成服务端渲染函数 */
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createBundle(serverBundle, clientManifest, template)
  app.use(require('koa-static')(resolve('./dist')))
} else {
  renderer = setupDevServer(app, templatePath, (bundle, clientManifest) => {
    renderer = createBundle(bundle, clientManifest, template)
  })
}

function renderToString (context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
}

app.use(favicon(path.join(__dirname, 'favicon.ico')))
/** response */
app.use(async (ctx, next) => {
  try {
    /** {{title}} 替换template占位符 */
    const context = {title: '服务端渲染测试', url: ctx.url}
    
    /** 将服务器端渲染好的html返回给客户端 */
    ctx.body = await renderToString(context)
    
    /** 设置请求头 */
    ctx.set('Content-Type', 'text/html')
    ctx.set('Server', 'Koa2 server side render')
  } catch (e) {
    /** 如果没找到，放过请求，继续运行后面的中间件 */
    next()
  }
})

app.listen(3001)
