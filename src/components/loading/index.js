import Loading from './Loading'

/**
 *  将Loading 挂载到全局
 * */
export default function install (Vue) {
  let instance = null
  Object.defineProperty(Vue.prototype, '$loadingBox', {
    get () {
      if (instance === null) {
        const Constructor = Vue.extend(Loading)
        const div = document.createElement('div')
        document.body.appendChild(div)
        instance = new Constructor()
        instance.$mount(div)
      }
      return instance
    }
  })
}
