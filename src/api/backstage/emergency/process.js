import request from '@/utils/request'

// 查询风险流程列表
export function listProcess(query) {
  return request({
    url: '/emergency/process/list',
    method: 'get',
    params: query
  })
}

// 查询风险流程详细
export function getProcess(id) {
  return request({
    url: '/emergency/process/' + id,
    method: 'get'
  })
}

// 新增风险流程
export function addProcess(data) {
  return request({
    url: '/emergency/process',
    method: 'post',
    data: data
  })
}

// 修改风险流程
export function updateProcess(data) {
  return request({
    url: '/emergency/process',
    method: 'put',
    data: data
  })
}

// 删除风险流程
export function delProcess(id) {
  return request({
    url: '/emergency/process/' + id,
    method: 'delete'
  })
}

// 设置默认风险流程
export function setDefaultProcess(id) {
  return request({
    url: '/emergency/process/default/' + id,
    method: 'get'
  })
}
