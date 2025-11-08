import request from '@/utils/request'

// 查询大屏照片设置列表
export function listSetting(query) {
  return request({
    url: '/leader/photo/list',
    method: 'get',
    params: query
  })
}
// 修改大屏照片设置
export function updateSetting(data) {
  return request({
    url: '/leader/photo',
    method: 'put',
    data: data
  })
}
