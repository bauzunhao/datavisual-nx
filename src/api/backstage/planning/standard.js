import request from '@/utils/request'

// 查询示范县标准设置信息列表
export function listStandard(query) {
  return request({
    url: '/planning/standard/list',
    method: 'get',
    params: query
  })
}

// 查询示范县标准设置信息详细
export function getStandard(standardId) {
  return request({
    url: '/planning/standard/' + standardId,
    method: 'get'
  })
}

// 新增示范县标准设置信息
export function addStandard(data) {
  return request({
    url: '/planning/standard',
    method: 'post',
    data: data
  })
}

// 修改示范县标准设置信息
export function updateStandard(data) {
  return request({
    url: '/planning/standard',
    method: 'put',
    data: data
  })
}

// 删除示范县标准设置信息
export function delStandard(standardIds) {
  return request({
    url: '/planning/standard/' + standardIds,
    method: 'delete'
  })
}
