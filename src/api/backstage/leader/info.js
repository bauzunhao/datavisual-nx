import request from '@/utils/request'

// 查询包案领导信息列表
export function listInfo(query) {
  return request({
    url: '/leader/info/list',
    method: 'get',
    params: query
  })
}

// 查询包案领导信息详细
export function getInfo(leaderId) {
  return request({
    url: '/leader/info/' + leaderId,
    method: 'get'
  })
}

// 新增包案领导信息
export function addInfo(data) {
  return request({
    url: '/leader/info',
    method: 'post',
    data: data
  })
}

// 修改包案领导信息
export function updateInfo(data) {
  return request({
    url: '/leader/info',
    method: 'put',
    data: data
  })
}

// 删除包案领导信息
export function delInfo(leaderId) {
  return request({
    url: '/leader/info/' + leaderId,
    method: 'delete'
  })
}

// 设置风险规则启停用状态
export function setStatus(leaderId) {
  return request({
    url: '/leader/info/status/' + leaderId,
    method: 'post'
  })
}

// 设置停用状态
export function setStatusIds(leaderId) {
  return request({
    url: '/leader/info/statusIds/' + leaderId,
    method: 'post'
  })
}
