import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Page1 from '@/pages/page1/Index'
import Page2 from '@/pages/page2/Index'
import Page3 from '@/pages/page3/Index'
import Page4 from '@/pages/page4/Index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'Page1', meta: {index: 0}, component: Page1},
    {path: '/page2', name: 'Page2', meta: {index: 1}, component: Page2},
    {path: '/page3', name: 'Page3', meta: {index: 2}, component: Page3},
    {path: '/page4', name: 'Page4', meta: {index: 3}, component: Page4}
  ]
})

const history = window.sessionStorage
let historyCount = getHistoryCount(history)
router.beforeEach(function (to, from, next) {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('UPDATE_DIRECTION', {direction: 'forward'})
    } else {
      store.commit('UPDATE_DIRECTION', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('UPDATE_DIRECTION', {direction: 'forward'})
  }
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

function getHistoryCount (history) {
  return history.getItem('count') || 0
}

export default router
