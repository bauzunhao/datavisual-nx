import request from '@/utils/request'

// 获取汇总数据
export function getSummaryData(query) {
  return request({
    url: '/datav/emergency/summary',
    method: 'get',
    params: query
  })
}

// 一级内容分类统计
export function getContentType(query) {
  return request({
    url: '/datav/emergency/content/type',
    method: 'get',
    params: query
  })
}

// 信访形式统计
export function getLetterType(query) {
  return request({
    url: '/datav/emergency/letter/type',
    method: 'get',
    params: query
  })
}

// 事件时间维度统计
export function getStatisByTime(query) {
  return request({
    url: '/datav/emergency/statis/time',
    method: 'get',
    params: query
  })
}

// 事件处理结果维度统计
export function getEventResult(query) {
  return request({
    url: '/datav/emergency/statis/result',
    method: 'get',
    params: query
  })
}

// 本年度事件列表
export function getEventList(query) {
  return request({
    url: '/datav/emergency/event/list',
    method: 'get',
    params: query
  })
}
