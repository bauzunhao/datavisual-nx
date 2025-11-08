import request from '@/utils/request'

// 查询示范县人口信息列表
export function listPopulation(query) {
  return request({
    url: '/planning/population/list',
    method: 'get',
    params: query
  })
}

// 查询示范县人口信息详细
export function getPopulation(populationId) {
  return request({
    url: '/planning/population/' + populationId,
    method: 'get'
  })
}

// 新增示范县人口信息
export function addPopulation(data) {
  return request({
    url: '/planning/population',
    method: 'post',
    data: data
  })
}

// 修改示范县人口信息
export function updatePopulation(data) {
  return request({
    url: '/planning/population',
    method: 'put',
    data: data
  })
}

// 删除示范县人口信息
export function delPopulation(populationId) {
  return request({
    url: '/planning/population/' + populationId,
    method: 'delete'
  })
}
