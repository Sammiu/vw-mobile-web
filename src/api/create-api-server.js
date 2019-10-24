/* eslint no-trailing-spaces: ["error", { "skipBlankLines": true }]*/

import axios from 'axios'
import https from 'https'
import devHost from '../../config/dev-host'

axios.defaults.timeout = 10000
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

/**
 * 统一处理网络异常
 * @param {Function} reject 请求被拒绝回调函数
 * @param {Object} reason 被拒绝的原因
 * @param {boolean} handleError 是否自己处理异常
 *
 * @return {void}
 **/
function handleNetworkError (reject, reason, handleError) {
  if (!handleError) {
  }
  reject && reject(reason)
}

/**
 * 统一处理 java 接口新的数据格式
 * @param {Promise} httpRequest 请求promise 对象
 * @param {boolean} handleError 是否自己处理异常
 *
 * @return {Promise} 返回promise 对象
 **/
function processRequest (httpRequest, handleError) {
  return new Promise((resolve, reject) =>
    httpRequest.then(response => {
      const item = response.data
      if (response.status === 200) {
        if (item.success) {
          resolve(item.result)
        } else {
          handleNetworkError(reject, item.error, handleError)
        }
      } else {
        handleNetworkError(reject, new Error('网络访问异常'), handleError)
      }
    }, reason => handleNetworkError(reject, reason, handleError)).catch(e => handleNetworkError(reject, e, handleError))
  )
}

/**
 * 以get方式提交数据
 *
 * @param {String} url 接口地址
 * @param {Object} params 需要提交的参数
 * @param {boolean} handleError 是否自己处理异常
 **/
export function get (url, params, handleError = false) {
  return processRequest(axios.get(url, {params: params}), handleError)
}

/**
 * 以post方式提交数据
 * @param {String} url 接口地址
 * @param {Object} params 需要提交的参数
 * @param {boolean} handleError 是否自己处理异常
 **/
export function post (url, params, handleError = false) {
  const option = {url: url, method: 'post', data: params}
  return processRequest(axios(option), handleError)
}
