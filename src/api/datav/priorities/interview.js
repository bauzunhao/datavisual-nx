import request from '@/utils/request'

// 获取领导接待日
export function getLeaderReceptionTime(query) {
  return request({
    url: '/datav/leader/reception/time',
    method: 'get',
    params: query
  })
}

// 获取领导接待信息
export function getLeaderReceptionInfo(query) {
  return request({
    url: '/datav/leader/reception/info',
    method: 'get',
    params: query
  })
}

// 获取领导接待总体统计
export function getLeaderReceptionStatis(query) {
  return request({
    url: '/datav/leader/reception/statis/summary',
    method: 'get',
    params: query
  })
}

// 获取领导接待属地统计
export function getLeaderReceptionStatisByZone(query) {
  return request({
    url: '/datav/leader/reception/statis/zone',
    method: 'get',
    params: query
  })
}

// 获取领导接待动态
export function getLeaderReceptionNews(query) {
  return request({
    url: '/datav/leader/reception/news',
    method: 'get',
    params: query
  })
}

// 获取领导接待图片
export function getLeaderReceptionPhoto(query) {
  return request({
    url: '/datav/leader/reception/photo',
    method: 'get',
    params: query
  })
}
