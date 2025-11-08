import request from '@/utils/request'

// 查询风险资源列表
export function listResources(query) {
  return request({
    url: '/emergency/resources/list',
    method: 'get',
    params: query
  })
}

// 查询风险资源详细
export function getResources(id) {
  return request({
    url: '/emergency/resources/' + id,
    method: 'get'
  })
}

// 新增风险资源
export function addResources(data) {
  return request({
    url: '/emergency/resources',
    method: 'post',
    data: data
  })
}

// 修改风险资源
export function updateResources(data) {
  return request({
    url: '/emergency/resources',
    method: 'put',
    data: data
  })
}

// 删除风险资源
export function delResources(id) {
  return request({
    url: '/emergency/resources/' + id,
    method: 'delete'
  })
}

// 设置默认风险资源
export function setDefaultResources(id) {
  return request({
    url: '/emergency/resources/default/' + id,
    method: 'get'
  })
}
