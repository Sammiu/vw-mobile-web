import {post} from './baseService'

export default {
  login (params) {
    return post('/api/mobile/login', params)
  }
}
