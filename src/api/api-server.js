/* eslint no-trailing-spaces: ["error", { "skipBlankLines": true }]*/

import axios from 'axios'
import https from 'https'
import devHost from '../../config/dev-host'

axios.defaults.timeout = 20000
axios.defaults.proxy = (function () {
  if (devHost.https) {
    const proxy = { host: devHost.https.host, port: devHost.https.port }

    /** 可以配置忽略https的证书认证 */
    axios.interceptors.request.use(function (config) {
      config.httpsAgent = new https.Agent({ rejectUnauthorized: false })
      return config
    })
    return proxy
  } else if (devHost.http) {
    return { host: devHost.http.host, port: devHost.http.port }
  }
})()

export const getCookie = (cname, cookie) => {
  if (cookie) {
    const name = cname + '='
    const ca = cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
  }
  return ''
}
