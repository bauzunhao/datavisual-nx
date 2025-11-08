import request from '@/utils/request'

// 查询网格投诉列表
export function listComplaint(query) {
  return request({
    url: '/grid/complaint/list',
    method: 'get',
    params: query
  })
}

// 查询网格投诉详细
export function getComplaint(id) {
  return request({
    url: '/grid/complaint/' + id,
    method: 'get'
  })
}

// 新增网格投诉
export function addComplaint(data) {
  return request({
    url: '/grid/complaint',
    method: 'post',
    data: data
  })
}

// 修改网格投诉
export function updateComplaint(data) {
  return request({
    url: '/grid/complaint',
    method: 'put',
    data: data
  })
}

// 删除网格投诉
export function delComplaint(id) {
  return request({
    url: '/grid/complaint/' + id,
    method: 'delete'
  })
}

//受理
export function acceptComplaint(data) {
    return request({
        url: '/grid/complaint/accept',
        method: 'post',
        params: data
    })
}

//办理
export function handleComplaint(data) {
    return request({
        url: '/grid/complaint/handle',
        method: 'post',
        params: data
    })
}

// 查询网格投诉流转记录列表
export function stateList(query) {
    return request({
        url: '/grid/complaint/stateList',
        method: 'get',
        params: query
    })
}

// 查询网格统计数据
export function listReportGroupByZone(query) {
    return request({
        url: '/grid/complaint/listReportGroupByZone',
        method: 'get',
        params: query
    })
}

// 查询网格内容分类统计数据
export function listReportGroupByContentType(query) {
    return request({
        url: '/grid/complaint/listReportGroupByContentType',
        method: 'get',
        params: query
    })
}
