import {get} from './baseService'

export function getAccountAll () {
  return get('/api/mobile/getAccountAll')
}
