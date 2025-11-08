import request from '@/utils/request'

// 查询网格社区列表
export function listCommunity(query) {
  return request({
    url: '/grid/community/list',
    method: 'get',
    params: query
  })
}

// 查询网格社区列表不分页
export function allList(query) {
    return request({
        url: '/grid/community/allList',
        method: 'get',
        params: query
    })
}

// 查询网格社区详细
export function getCommunity(id) {
  return request({
    url: '/grid/community/' + id,
    method: 'get'
  })
}

// 新增网格社区
export function addCommunity(data) {
  return request({
    url: '/grid/community',
    method: 'post',
    data: data
  })
}

// 修改网格社区
export function updateCommunity(data) {
  return request({
    url: '/grid/community',
    method: 'put',
    data: data
  })
}

// 删除网格社区
export function delCommunity(id) {
  return request({
    url: '/grid/community/' + id,
    method: 'delete'
  })
}
