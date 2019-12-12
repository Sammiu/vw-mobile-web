import MessageBox from './MessageBox'

/**
 *  将MessageBox 挂载到全局
 * */
export default function install (Vue) {
  let instance = null
  Object.defineProperty(Vue.prototype, '$message', {
    get () {
      if (instance === null) {
        const Constructor = Vue.extend(MessageBox)
        const div = document.createElement('div')
        document.body.appendChild(div)
        instance = new Constructor()
        instance.$mount(div)
      }
      return instance
    }
  })
}
