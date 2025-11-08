import request from '@/utils/request'

export function loadData() {
  return request({
    url: '/linkage/video/detail',
    method: 'get'
  })
}

export function saveConfig(data) {
  return request({
    url: '/linkage/video/config',
    method: 'put',
    data: data
  })
}
