import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import {UPDATE_DIRECTION} from '@/store/types'
import Main from '@/pages/main/Index'

const Login = () => import('@/pages/login/Index')
const Page1 = () => import('@/pages/page1/Index')
const Page2 = () => import('@/pages/page2/Index')
const Page3 = () => import('@/pages/page3/Index')
const Page4 = () => import('@/pages/page4/Index')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'main', component: Main},
    {path: '/login', name: 'login', meta: {requireAuth: true}, component: Login},
    {path: '/page1', name: 'Page1', meta: {requireAuth: true}, component: Page1},
    {path: '/page2', name: 'Page2', meta: {requireAuth: true}, component: Page2},
    {path: '/page3', name: 'Page3', meta: {requireAuth: true}, component: Page3},
    {path: '/page4', name: 'Page4', meta: {requireAuth: true}, component: Page4}
  ]
})

let pageStack = null

if (process.env.VUE_ENV === 'client') {
  pageStack = {'/': {form: '/login', direction: 'forward'}}
}

router.beforeEach(function (to, from, next) {
  if (pageStack && pageStack.hasOwnProperty(to.path)) {
    const item = pageStack[to.path]
    store.commit(UPDATE_DIRECTION, {direction: item.form === from.path ? item.direction : ''})
  } else {
    store.commit(UPDATE_DIRECTION, {direction: ''})
  }
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

export default router
