import request from '@/utils/request'

// 查询近期包案领导
export function getLeaderInfo(query) {
  return request({
    url: '/datav/leader/package/info',
    method: 'get',
    params: query
  })
}
// 查询图片
export function getLeaderPhoto(query) {
  return request({
    url: '/datav/leader/package/photo',
    method: 'get',
    params: query
  })
}
// 查询包案事项详情
export function getLeaderPetition(query) {
  return request({
    url: '/datav/leader/package/petition/'+query,
    method: 'get',
  })
}
// 查询包案事项集合
export function getLeaderPetitionList(query) {
  return request({
    url: '/datav/leader/package/petition',
    method: 'get',
    params: query
  })
}
