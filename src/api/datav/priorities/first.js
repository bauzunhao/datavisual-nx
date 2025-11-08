import request from '@/utils/request'

// 获取初次信访结构化摘要统计数据
export function getFirstPetitionSummaryData(query) {
  return request({
    url: '/datav/first/summary',
    method: 'get',
    params: query
  })
}

// 获取初次信访反映渠道（信访形式）统计数据
export function getFirstPetitionByLetterType(query) {
  return request({
    url: '/datav/first/letterType',
    method: 'get',
    params: query
  })
}

// 获取初次信访主要问题（二级内容分类）统计数据
export function getFirstPetitionByContentType(query) {
  return request({
    url: '/datav/first/contentType',
    method: 'get',
    params: query
  })
}

// 获取初次信访各属地的统计数据
export function getFirstPetitionByZone(query) {
  return request({
    url: '/datav/first/zone',
    method: 'get',
    params: query
  })
}

// 获取初次信访各属地信访形式分布的统计数据
export function getFirstPetitionLetterTypeByZone(query) {
  return request({
    url: '/datav/first/zone/letterType',
    method: 'get',
    params: query
  })
}

// 获取初次信访各月份分布的统计数据
export function getFirstPetitionByMonth(query) {
  return request({
    url: '/datav/first/month',
    method: 'get',
    params: query
  })
}

// 获取初次信访各月份信访形式分布的统计数据
export function getFirstPetitionLetterTypeByMonth(query) {
  return request({
    url: '/datav/first/month/letterType',
    method: 'get',
    params: query
  })
}


// 获取各地区一次性化解率的统计数据
export function getResolutionRateByZone(query) {
  return request({
    url: '/datav/first/resolution/rate',
    method: 'get',
    params: query
  })
}
