import { get } from './baseService'

export const getAccountAll = () => {
  return get('/api/mobile/getAccountAll')
}
