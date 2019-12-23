// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import 'babel-polyfill'
import Loading from './components/loading'
import MessageBox from './components/messageBox'

if (process.env.VUE_ENV === 'client') {
  Vue.use(Loading)
  Vue.use(MessageBox)
}

Vue.config.productionTip = false

export function createApp () {
  const app = new Vue({
    router,
    store,
    render: h => h(App),
    mounted () {
    }
  })
  return {app, router, store}
}
