import { post, get } from './baseService'

export default {
  login: (params) => {
    return post('/api/mobile/public/login', params)
  },
  checkLogin: (authorization) => {
    return get('/api/mobile/checkLogin', undefined, { authorization })
  }
}
