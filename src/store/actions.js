import {UPDATE_USER_INFO} from './types'
import {getAccountAll} from '@/api/account'

export default {
  fetchUserInfo ({commit}) {
    return getAccountAll().then(item => {
      commit(UPDATE_USER_INFO, item)
    })
  }
}
