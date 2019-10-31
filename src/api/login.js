import {post} from './baseService'

export function login () {
  return post('/ms/api/ithospital/backstage/backstageLogin', {userName: 'admin', password: '123456'})
}
