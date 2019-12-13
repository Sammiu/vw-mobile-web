/* eslint no-trailing-spaces: ["error", { "skipBlankLines": true }]*/

import axios from 'axios'
import https from 'https'
import devHost from '../../config/dev-host'

axios.defaults.timeout = 20000
axios.defaults.proxy = (function () {
  if (devHost.https) {
    const proxy = {host: devHost.https.host, port: devHost.https.port}
    
    /** 可以配置忽略https的证书认证 */
    axios.interceptors.request.use(function (config) {
      config.httpsAgent = new https.Agent({rejectUnauthorized: false})
      return config
    })
    return proxy
  } else if (devHost.http) {
    return {host: devHost.http.host, port: devHost.http.port}
  }
})()

let cookie = null

export function setCookies (Cookies) {
  cookie = Cookies
}

axios.interceptors.request.use(config => {
  if (process.env.VUE_ENV === 'server') {
    config.headers.cookie = cookie
  }
  return config
}, error => Promise.reject(error))
