import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import { UPDATE_DIRECTION } from '@/store/types'
import Main from '@/pages/main/Index'

const Login = () => import('@/pages/login/Index')
const Pay = () => import('@/pages/pay/Index')

Vue.use(Router)

export const scrollPosition = {
  main: { x: 0, y: 0 }
}
const getScrollTop = () => document.documentElement.scrollTop || document.body.scrollTop

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'main', meta: { background: '#fff' }, component: Main },
    { path: '/login', name: 'login', meta: { background: '#fff' }, component: Login },
    { path: '/pay', name: 'pay', meta: { background: '#fff' }, component: Pay }
  ],
  scrollBehavior: function (to, from, savedPosition) {
    if (scrollPosition.hasOwnProperty(from.name)) {
      scrollPosition[from.name].y = getScrollTop()
    }
    return { x: 0, y: 0 }
  }
})

let pageStack = null

if (process.env.VUE_ENV === 'client') {
  pageStack = {
    'main': [
      { form: 'login', direction: 'forward' },
      { form: 'pay', direction: 'reverse' }
    ],
    'pay': [
      { form: 'main', direction: 'forward' }
    ]
  }
}

router.beforeEach(function (to, from, next) {
  if (pageStack && pageStack.hasOwnProperty(to.name)) {
    const item = pageStack[to.name].find(o => o.form === from.name)
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

router.afterEach(function (to, from, next) {
})

export default router
