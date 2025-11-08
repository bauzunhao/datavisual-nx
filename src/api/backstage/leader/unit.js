import request from '@/utils/request'

// 查询包案参与单位信息列表
export function listUnit(query) {
  return request({
    url: '/leader/unit/list',
    method: 'get',
    params: query
  })
}

// 查询包案参与单位信息详细
export function getUnit(joinUnitId) {
  return request({
    url: '/leader/unit/' + joinUnitId,
    method: 'get'
  })
}

// 新增包案参与单位信息
export function addUnit(data) {
  return request({
    url: '/leader/unit',
    method: 'post',
    data: data
  })
}

// 修改包案参与单位信息
export function updateUnit(data) {
  return request({
    url: '/leader/unit',
    method: 'put',
    data: data
  })
}

// 删除包案参与单位信息
export function delUnit(joinUnitId) {
  return request({
    url: '/leader/unit/' + joinUnitId,
    method: 'delete'
  })
}

