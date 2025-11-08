import request from '@/utils/request'

// 获取突出矛盾统计数据
export function getHighlightContradictionsData(query) {
  return request({
    url: '/datav/highlightContradictions/getHighlightContradictionsData',
    method: 'get',
    params: query,
    timeout:30000
  })
}

// 获取突出矛盾地市分组数据
export function getZoneGroupData(query) {
  return request({
    url: '/datav/highlightContradictions/getZoneGroupData',
    method: 'get',
    params: query,
    timeout:30000
  })
}

// 获取突出矛盾一级top10数据
export function getByOneDataTop10(query) {
  return request({
    url: '/datav/highlightContradictions/getByOneDataTop10',
    method: 'get',
    params: query,
    timeout:30000
  })
}

// 获取突出矛盾月分组数据
export function getByMonthGroupData(query) {
  return request({
    url: '/datav/highlightContradictions/getByMonthGroupData',
    method: 'get',
    params: query,
    timeout:30000
  })
}

// 获取突出矛盾数据
export function getByTypeData(query) {
  return request({
    url: '/datav/highlightContradictions/getByTypeData',
    method: 'get',
    params: query,
    timeout:30000
  })
}

// 查询其他矛盾集合数据
export function getOtherData(query) {
  return request({
    url: '/datav/highlightContradictions/getOtherData',
    method: 'get',
    params: query,
    timeout:30000
  })
}
// 获取突出矛盾热词数据
export function getByKeywordData(query) {
    return request({
        url: '/datav/highlightContradictions/getByKeywordData',
        method: 'get',
        params: query,
        timeout:30000
    })
}

