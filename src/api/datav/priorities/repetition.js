import request from '@/utils/request'

// 获取重复信访结构化摘要统计数据
export function getRepeatPetitionSummaryData(query) {
  return request({
    url: '/datav/repeat/summary',
    method: 'get',
    params: query
  })
}

// 获取重复信访主要问题（二级内容分类）统计数据
export function getRepeatPetitionByContentType(query) {
  return request({
    url: '/datav/repeat/contentType',
    method: 'get',
    params: query
  })
}

// 获取重复信访各属地的统计数据
export function getRepeatPetitionByZone(query) {
  return request({
    url: '/datav/repeat/zone',
    method: 'get',
    params: query
  })
}

// 获取重复信访各月份分布的统计数据
export function getRepeatPetitionByMonth(query) {
  return request({
    url: '/datav/repeat/month',
    method: 'get',
    params: query
  })
}

// 获取重复信访各月份初重件分布的统计数据
export function getPetitionRepeatTypeByMonth(query) {
  return request({
    url: '/datav/repeat/month/repeatType',
    method: 'get',
    params: query
  })
}

// 获取专项行动三批次统计数据
export function getSpecialItemBatchData(query) {
  return request({
    url: '/datav/repeat/special/batch',
    method: 'get',
    params: query
  })
}

// 获取重复信访人Top5统计数据
export function getRepeatPetitionPerson(query) {
  return request({
    url: '/datav/repeat/person/top',
    method: 'get',
    params: query
  })
}

// 获取市直部门重复信访的统计数据
export function getRepeatPetitionMunicipalDirect(query) {
  return request({
    url: '/datav/repeat/municipal/direct',
    method: 'get',
    params: query
  })
}

// 获取初件办结后产生重复信访各属地的统计数据
export function getFirstEndAfterRepeatByZone(query) {
  return request({
    url: '/datav/repeat/first/end/after',
    method: 'get',
    params: query
  })
}

// 获取专项件第三批次各属地的统计数据
export function getSpecialThirdBatchByZone(query) {
  return request({
    url: '/datav/repeat/special/batch/third/zone',
    method: 'get',
    params: query
  })
}
// 获取历次信访统计数据
export function getHistoryTotal(query) {
  return request({
    url: '/datav/history/total',
    method: 'get',
    params: query
  })
}
// 获取历次信访详细数据
export function getHistoryInfo(query) {
  return request({
    url: '/datav/history/info',
    method: 'get',
    params: query
  })
}
