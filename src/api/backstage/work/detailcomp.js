import request from '@/utils/request'
// 查询信访件详情数据
export function getInfoDetailData(query) {
  return request({
    url: '/general/petition/detail',
    method: 'get',
    params: query,
    timeout:60000
  })
}

