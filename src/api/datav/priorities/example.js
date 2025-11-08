import request from '@/utils/request'

// 获取示范县人口信息
export function getPopulation(data) {
  return request({
    url: '/datav/planning/population',
    method: 'get',
  })
}
// 获取满足标准的示范县
export function getShow(data) {
  return request({
    url: '/datav/planning/show',
    method: 'get',
  })
}
// 获取柱状图
export function getHistogram(data) {
  return request({
    url: '/datav/planning/histogram',
    method: 'get',
  })
}
//年度示范县荣誉榜
export function getHonorListTop5(data) {
    return request({
        url: '/datav/planning/honorListTop5',
        method: 'get',
    })
}

