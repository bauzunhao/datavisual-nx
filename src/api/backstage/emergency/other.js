import request from '@/utils/request'

// 查询应急其他设置
export function loadData() {
  return request({
    url: '/emergency/other/detail',
    method: 'get'
  })
}

// 保存应急其他设置
export function saveSetting(data) {
  return request({
    url: '/emergency/other/save',
    method: 'put',
    data: data
  })
}
