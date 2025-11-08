import request from '@/utils/request'

// 查询包案信访事项信息列表
export function listPetition(query) {
  return request({
    url: '/interview/visit/list',
    method: 'get',
    params: query
  })
}

// 查询包案信访事项信息详细
export function getVisitPetition(visitId) {
  return request({
    url: '/interview/visit/' + visitId,
    method: 'GET'
  })
}

// 新增包案信访事项信息
export function addPetition(data) {
  return request({
    url: '/interview/visit',
    method: 'post',
    data: data
  })
}

// 修改包案信访事项信息
export function updatePetition(data) {
  return request({
    url: '/interview/visit',
    method: 'put',
    data: data
  })
}

// 删除包案信访事项信息
export function delPetition(visitId) {
  return request({
    url: '/interview/visit/' + visitId,
    method: 'delete'
  })
}

// 查询选择信访件信息列表
export function listLetter(query) {
  return request({
    url: '/interview/visit/letterList',
    method: 'get',
    params: query,
    timeout:500000
  })
}
// 发布
export function verifyVisit(data) {
    return request({
        url: '/interview/visit/verify',
        method: 'post',
        data: data
    })
}
