import request from '@/utils/request'

// 获取办理情况数据
export function getTransactData() {
  return request({
    url: '/datav/transact/getTransactData',
    method: 'get',
    params: {},
    timeout:60000
  })
}

// 获取办理情况在办件地市分组数据
export function getInProcessZoneGroupData() {
  return request({
    url: '/datav/transact/getInProcessZoneGroupData',
    method: 'get',
    params: {},
    timeout:30000
  })
}

// 获取办理情况预警地市分组数据
export function getWarningZoneGroupData() {
  return request({
    url: '/datav/transact/getWarningZoneGroupData',
    method: 'get',
    params: {},
    timeout:30000
  })
}

// 获取办理情况责任单位数据
export function getByUnitAllData() {
  return request({
    url: '/datav/transact/getByUnitAllData',
    method: 'get',
    params: {},
    timeout:30000
  })
}

// 获取未答复数据
export function getByNoResponseData(query) {
    return request({
        url: '/datav/transact/getByNoResponseData',
        method: 'get',
        params: query,
        timeout:30000
    })
}

// 获取未评价数据
export function getByNotEvaluatedData(query) {
    return request({
        url: '/datav/transact/getByNotEvaluatedData',
        method: 'get',
        params: query,
        timeout:30000
    })
}
