import request from '@/utils/request'

// 查询示范县展示信息列表
export function listShow(query) {
  return request({
    url: '/planning/show/list',
    method: 'get',
    params: query,
    timeout: 5000
  })
}

// 新增示范县展示信息
export function addShow(data) {
  return request({
    url: '/planning/show',
    method: 'post',
    data: data
  })
}

// 修改示范县展示信息
export function updateShow(data) {
  return request({
    url: '/planning/show',
    method: 'put',
    data: data
  })
}
// 条件获取示范县展示信息
export function getInfoByParm(data) {
  return request({
    url: '/planning/show/parm',
    method: 'get',
    params: data
  })
}
// 条件获取示范县展示信息
export function getShow(data) {
  return request({
    url: '/planning/show/'+data,
    method: 'get',
  })
}
