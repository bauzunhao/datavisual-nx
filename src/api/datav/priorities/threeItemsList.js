import request from '@/utils/request'

// 获取三清单统计数据
export function getThreeItemsListData() {
  return request({
    url: '/datav/threeItemsList/getThreeItemsListData',
    method: 'get',
    params: {},
    timeout:60000
  })
}

// 获取三清单全地市数据
export function getByZoneGroupData() {
  return request({
    url: '/datav/threeItemsList/getByZoneGroupData',
    method: 'get',
    params: {},
    timeout:30000
  })
}

// 获取三清单全地市化解情况数据
export function getByZoneEndGroupData() {
  return request({
    url: '/datav/threeItemsList/getByZoneEndGroupData',
    method: 'get',
    params: {},
    timeout:30000
  })
}

// 获取三清单月数据
export function getByMonthGroupData() {
  return request({
    url: '/datav/threeItemsList/getByMonthGroupData',
    method: 'get',
    params: {},
    timeout:30000
  })
}
