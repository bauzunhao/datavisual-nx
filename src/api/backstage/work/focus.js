import request from '@/utils/request'

// 查询重点攻坚工作列表
export function listFocusWork(query) {
  return request({
    url: '/work/focus/list',
    method: 'get',
    params: query
  })
}

// 查询重点攻坚工作详细
export function getWork(focusId) {
  return request({
    url: '/work/focus/' + focusId,
    method: 'get'
  })
}

// 新增重点攻坚工作
export function addFocusWork(data) {
  return request({
    url: '/work/focus',
    method: 'post',
    data: data,
    timeout: 120000
  })
}

// 修改重点攻坚工作
export function updateWork(data) {
  return request({
    url: '/work/focus',
    method: 'put',
    data: data,
    timeout: 60000
  })
}

// 删除重点攻坚工作
export function delFocusWorkByLetterCode(letterCode) {
  return request({
    url: '/work/focus/del/' + letterCode,
    method: 'delete'
  })
}
// 统计重点攻坚工作
export function listFocusReportData(query) {
  return request({
    url: '/work/focus/listFocusReportData',
    method: 'get',
    params: query,
    timeout: 30000
  })
}
// 汇总重点攻坚工作
export function getFocusSummaryData() {
  return request({
    url: '/work/focus/getFocusSummaryData',
    method: 'get',
    timeout:30000
  })
}


