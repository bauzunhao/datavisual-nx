import request from '@/utils/request'
// 查询扬言件数据
export function listThreatenData(query) {
  return request({
    url: '/work/source/threaten/listThreatenData',
    method: 'get',
    params: query,
    timeout:30000
  })
}
// 统计扬言件数据
export function listThreatenReportData(query) {
  return request({
    url: '/work/source/threaten/listThreatenReportData',
    method: 'get',
    params: query,
    timeout: 30000
  })
}

// 汇总扬言件数据
export function getThreatenSummaryData() {
    return request({
      url: '/work/source/threaten/getThreatenSummaryData',
      method: 'get',
      timeout:30000
    })
}
