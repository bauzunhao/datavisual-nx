import request from '@/utils/request'

export function initZoneList(query) {
  return request({
    url: '/general/zone/init',
    method: 'get',
    params: query
  })
}
