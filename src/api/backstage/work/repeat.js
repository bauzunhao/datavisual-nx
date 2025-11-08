import request from '@/utils/request'
// 查询重件数据
export function listRepeatData(query) {
  return request({
    url: '/work/source/repeat/listRepeatData',
    method: 'get',
    params: query,
    timeout:30000
  })
}
// 统计重件数据
export function listRepeatReportData(query) {
  return request({
    url: '/work/source/repeat/listRepeatReportData',
    method: 'get',
    params: query,
    timeout: 30000
  })
}

// 汇总重件数据
export function getRepeatSummaryData() {
    return request({
      url: '/work/source/repeat/getRepeatSummaryData',
      method: 'get',
      timeout:30000
    })
}
