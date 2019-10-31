/* eslint no-trailing-spaces: ["error", { "skipBlankLines": true }]*/

import {createApp} from '@/main'
import {setCookies} from '@/api/api-server'

export default function (context) {
  return new Promise((resolve, reject) => {
    const {app, router, store} = createApp()
    
    router.push(context.url)
    
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      
      /** 匹配不到的路由，执行 reject 函数，并返回 404 */
      if (!matchedComponents.length) {
        // eslint-disable-next-line
        return reject({code: 404})
      }
      
      /** SSR期间同步cookies */
      setCookies(context.cookies)
      
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state
        
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
