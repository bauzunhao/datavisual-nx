import request from '@/utils/request'

// 查询风险事件列表
export function listEvent(query) {
  return request({
    url: '/emergency/event/list',
    method: 'get',
    params: query
  })
}

// 查询风险事件详细
export function getEvent(eventId) {
  return request({
    url: '/emergency/event/' + eventId,
    method: 'get'
  })
}

// 新增风险事件
export function addEvent(data) {
  return request({
    url: '/emergency/event',
    method: 'post',
    data: data
  })
}

// 修改风险事件
export function updateEvent(data) {
  return request({
    url: '/emergency/event',
    method: 'put',
    data: data
  })
}

// 删除风险事件
export function delEvent(eventId) {
  return request({
    url: '/emergency/event/' + eventId,
    method: 'delete'
  })
}

export function reportContent(eventId) {
  return request({
    url: '/emergency/event/report/' + eventId,
    method: 'get'
  })
}

// 查询风险事件详细含信访件相关信息
export function getEventDetail(eventId) {
  return request({
    url: '/emergency/event/detail/' + eventId,
    method: 'get'
  })
}

// 定级风险事件
export function gradingEvent(data) {
  return request({
    url: '/emergency/event/grading',
    method: 'put',
    data: data
  })
}

// 定级风险事件
export function closeEvent(data) {
  return request({
    url: '/emergency/event/close',
    method: 'put',
    data: data
  })
}
