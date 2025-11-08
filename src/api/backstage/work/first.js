import request from '@/utils/request'
// 查询初件数据
export function listFirstData(query) {
  return request({
    url: '/work/source/first/listFirstData',
    method: 'get',
    params: query,
    timeout:30000
  })
}
// 统计初件数据
export function listFirstReportData(query) {
  return request({
    url: '/work/source/first/listFirstReportData',
    method: 'get',
    params: query,
    timeout: 30000
  })
}

// 汇总初件数据
export function getFirstSummaryData() {
    return request({
      url: '/work/source/first/getFirstSummaryData',
      method: 'get',
      timeout:30000
    })
}
