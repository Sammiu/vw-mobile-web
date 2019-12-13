const Koa = require('koa')
const app = new Koa()
const fs = require('fs')
const path = require('path')
const favicon = require('koa-favicon')
const {createBundleRenderer} = require('vue-server-renderer')
const setupDevServer = require('./build/ssr/setup-dev-server')

const resolve = file => path.resolve(__dirname, file)

const setReponseError = (ctx, code) => {
  ctx.body = fs.readFileSync(`./${code}.html`, 'utf-8')
  ctx.status = code
  ctx.set('Content-Type', 'text/html')
}

const createBundle = (bundle, clientManifest, template) => {
  return createBundleRenderer(bundle, {
    runInNewContext: false, /** 推荐 */
    template: template, /** 模板html文件 */
    clientManifest: clientManifest, /** client manifest */
    shouldPreload: (file, type) => false,
    shouldPrefetch: (file, type) => false
  })
}

/** 根据环境变量赋值 */
let renderer
const templatePath = path.resolve(__dirname, './index.template.html')
const template = fs.readFileSync(templatePath, 'utf-8')
if (global.process.env.NODE_ENV === 'production') {
  /** 生成服务端渲染函数 */
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createBundle(serverBundle, clientManifest, template)
  app.use(require('koa-static')(resolve('./dist')))
} else {
  setupDevServer(app, templatePath, (bundle, clientManifest) => {
    renderer = createBundle(bundle, clientManifest, template)
  })
}

function renderToString (context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      if (err) {
        reject({code: err.code || 500, err: err})
      } else {
        resolve(html)
      }
    })
  })
}

app.use(favicon(path.join(__dirname, 'favicon.ico')))


app.use(async (ctx, next) => {
  try {
    const context = {title: '约跑', url: ctx.url, cookies: ctx.cookies.request.headers.cookie}
    /** 将服务器端渲染好的html返回给客户端 */
    ctx.body = await renderToString(context)
    ctx.set('Content-Type', 'text/html')
  } catch (e) {
    if (e.code === 404) {
      setReponseError(ctx, 404)
    } else if (e.code === 1001) {
      ctx.response.redirect('/login')
    } else {
      setReponseError(ctx, 500)
    }
  }
})

app.on('error', (error) => {
  console.log(error)
})

app.listen(3366)
