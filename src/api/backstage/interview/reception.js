import request from '@/utils/request'

// 查询领导接待日信息列表
export function listInterview(query) {
  return request({
    url: '/interview/reception/list',
    method: 'get',
    params: query
  })
}

// 查询领导接待日信息详细
export function getInterview(servedId) {
  return request({
    url: '/interview/reception/' + servedId,
    method: 'get'
  })
}

// 新增领导接待日信息
export function addInterview(data) {
  return request({
    url: '/interview/reception',
    method: 'post',
    data: data
  })
}

// 修改领导接待日信息
export function updateInterview(data) {
  return request({
    url: '/interview/reception',
    method: 'put',
    data: data
  })
}

// 删除领导接待日信息
export function delInterview(servedId) {
  return request({
    url: '/interview/reception/' + servedId,
    method: 'delete'
  })
}
