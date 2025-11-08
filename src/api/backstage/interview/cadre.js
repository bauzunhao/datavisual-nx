import request from '@/utils/request'

// 查询接访下访干部信息列表
export function listCadre(query) {
  return request({
    url: '/interview/cadre/list',
    method: 'get',
    params: query
  })
}

// 查询接访下访干部信息详细
export function getCadre(cadreId) {
  return request({
    url: '/interview/cadre/' + cadreId,
    method: 'get'
  })
}

// 新增接访下访干部信息
export function addCadre(data) {
  return request({
    url: '/interview/cadre',
    method: 'post',
    data: data
  })
}

// 修改接访下访干部信息
export function updateCadre(data) {
  return request({
    url: '/interview/cadre',
    method: 'put',
    data: data
  })
}

// 删除接访下访干部信息
export function delCadre(cadreId) {
  return request({
    url: '/interview/cadre/' + cadreId,
    method: 'delete'
  })
}

// 设置风险规则启停用状态
export function setStatus(leaderId) {
  return request({
    url: '/interview/cadre/status/' + leaderId,
    method: 'post'
  })
}


// 设置停用状态
export function setStatusIds(leaderId) {
  return request({
    url: '/interview/cadre/statusIds/' + leaderId,
    method: 'post'
  })
}

