import request from '@/utils/request'

export function getSummaryData(query) {
  return request({
    url: '/home/index/summary',
    method: 'get',
    params: query
  })
};

export function getZoneRegisterNum(query) {
  return request({
    url: '/home/index/zone',
    method: 'get',
    params: query
  })
};

export function getZoneFirstNum(query) {
  return request({
    url: '/home/index/first',
    method: 'get',
    params: query
  })
};

export function getZoneRepeatNum(query) {
  return request({
    url: '/home/index/repeat',
    method: 'get',
    params: query
  })
};


export function getGridData(query) {
    return request({
        url: '/home/index/grid',
        method: 'get',
        params: query
    })
};
