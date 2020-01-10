import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import { UPDATE_DIRECTION } from '@/store/types'
import Main from '@/pages/main/Index'

const Login = () => import('@/pages/login/Index')
const Pay = () => import('@/pages/pay/Index')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'main', component: Main },
    { path: '/login', name: 'login', meta: { requireAuth: true }, component: Login },
    { path: '/pay', name: 'Pay', meta: { requireAuth: true }, component: Pay }
  ]
})

let pageStack = null

if (process.env.VUE_ENV === 'client') {
  pageStack = {
    '/': [
      { form: '/login', direction: 'forward' },
      { form: '/pay', direction: 'reverse' }
    ],
    '/pay': [
      { form: '/', direction: 'forward' }
    ]
  }
}

router.beforeEach(function (to, from, next) {
  if (pageStack && pageStack.hasOwnProperty(to.path)) {
    const item = pageStack[to.path].find(o => o.form === from.path)
    if (item) {
      store.commit(UPDATE_DIRECTION, { direction: item.direction || '' })
    } else {
      store.commit(UPDATE_DIRECTION, { direction: '' })
    }
  } else {
    store.commit(UPDATE_DIRECTION, { direction: '' })
  }
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

export default router
