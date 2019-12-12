import * as types from './types'
import getters from './getters'

const state = {direction: 'forward', userInfo: null, currentRouteName: null}

const mutations = {
  [types.UPDATE_ROUTE_NAME] (state, payload) {
    state.currentRouteName = payload.routeName
  },
  [types.UPDATE_DIRECTION] (state, payload) {
    state.direction = payload.direction
  },
  [types.UPDATE_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  }
}

export default {
  state,
  mutations,
  getters
}
