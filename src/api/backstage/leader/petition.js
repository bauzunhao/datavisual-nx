import request from '@/utils/request'

// 查询包案信访事项信息列表
export function listPetition(query) {
  return request({
    url: '/leader/petition/list',
    method: 'get',
    params: query
  })
}

// 查询选择信访件信息列表
export function listLetter(query) {
  return request({
    url: '/leader/petition/letterList',
    method: 'get',
    params: query,
    timeout:5000
  })
}

// 查询包案信访事项信息详细
export function getPetition(petitionId) {
  return request({
    url: '/leader/petition/' + petitionId,
    method: 'get'
  })
}

// 新增包案信访事项信息
export function addPetition(data) {
  return request({
    url: '/leader/petition',
    method: 'post',
    data: data
  })
}

// 修改包案信访事项信息
export function updatePetition(data) {
  return request({
    url: '/leader/petition',
    method: 'put',
    data: data
  })
}

// 删除包案信访事项信息
export function delPetition(petitionId) {
  return request({
    url: '/leader/petition/' + petitionId,
    method: 'delete'
  })
}

// 发布
export function verifyPetition(data) {
    return request({
        url: '/leader/petition/verify',
        method: 'post',
        data: data
    })
}
