import {post} from './create-api-server'

export function login () {
  return post('/ms/api/ithospital/backstage/backstageLogin', {userName: 'admin', password: '123456'})
}
