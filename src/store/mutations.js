import * as types from './types'
import getters from './getters'

const state = {direction: 'forward', userInfo: null}

const mutations = {
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
