import {login} from '@/api/login'

export default {
  fetchUserInfo ({commit}) {
    return login().then(item => {
      commit('UPDATE_USER_INFO', item)
    })
  }
}
