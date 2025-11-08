import request from '@/utils/request'

// 查询示范县荣誉榜列表
export function listHonor(query) {
  return request({
    url: '/planning/honor/list',
    method: 'get',
    params: query
  })
}

// 查询示范县荣誉榜详细
export function getHonor(id) {
  return request({
    url: '/planning/honor/' + id,
    method: 'get'
  })
}

// 新增示范县荣誉榜
export function addHonor(data) {
  return request({
    url: '/planning/honor',
    method: 'post',
    data: data
  })
}

// 修改示范县荣誉榜
export function updateHonor(data) {
  return request({
    url: '/planning/honor',
    method: 'put',
    data: data
  })
}

// 删除示范县荣誉榜
export function delHonor(id) {
  return request({
    url: '/planning/honor/' + id,
    method: 'delete'
  })
}
