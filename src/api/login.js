import {post, get} from './baseService'

export default {
  login (params) {
    return post('/api/mobile/public/login', params)
  },
  checkLogin () {
    return get('/api/mobile/checkLogin')
  }
}
