/* eslint no-trailing-spaces: ["error", { "skipBlankLines": true }]*/

import Qs from 'qs'
import axios from 'axios'

/**
 * 以访问表单的格式提交数据
 *
 * @return {Object} Http 自定义头部信息
 **/
function getHeaders () {
  return {}
}

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
          resolve(item.data)
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
export function get (url, params = undefined, handleError = false) {
  return processRequest(axios.get(url, {params: params, headers: getHeaders()}), handleError)
}

/**
 * 以post方式提交数据
 * @param {String} url 接口地址
 * @param {Object} params 需要提交的参数
 * @param {boolean} handleError 是否自己处理异常
 **/
export function post (url, params, handleError = false) {
  const option = {url: url, method: 'post', data: params, headers: getHeaders()}
  return processRequest(axios(option), handleError)
}

/**
 * 以访问表单的格式提交数据
 *
 * @param {String} url 接口地址
 * @param {Object} params 需要提交的参数
 * @param {boolean} handleError 是否自己处理异常
 **/
export function postWithForm (url, params, handleError = false) {
  const headers = Object.assign({
    'Content-Type': 'application/x-www-form-urlencoded'
  }, getHeaders())
  const option = {url: url, method: 'post', data: Qs.stringify(params), headers: headers}
  return processRequest(axios(option), handleError)
}
