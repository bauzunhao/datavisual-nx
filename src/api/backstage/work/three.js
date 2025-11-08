import request from '@/utils/request'
// 查询三清单数据
export function listData(query) {
  return request({
    url: '/work/source/three/listData',
    method: 'get',
    params: query,
    timeout:30000
  })
}
// 统计三清单数据
export function listReportData(query) {
  return request({
    url: '/work/source/three/listReportData',
    method: 'get',
    params: query,
    timeout: 30000
  })
}

// 汇总三清单数据
export function getSummaryData() {
    return request({
      url: '/work/source/three/getSummaryData',
      method: 'get',
      timeout:30000
    })
}

//导入数据
export function addThreeData(data) {
    return request({
        url: '/work/source/three',
        method: 'post',
        data: data,
        timeout: 120000
    })
}
// 删除数据
export function delByLetterCode(letterCode) {
    return request({
        url: '/work/source/three/del/' + letterCode,
        method: 'delete',
        timeout:30000
    })
}
