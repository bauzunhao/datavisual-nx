import request from '@/utils/request'

// 获取工作效率统计数据
export function getWorkPerformanceData(query) {
  return request({
    url: '/datav/overview/getWorkPerformanceData',
    method: 'get',
    params: query,
    timeout: 30000
  })
}

// 获取按期答复率地市分组数据
export function listAqdflZoneGroupData(query) {
  return request({
    url: '/datav/overview/listAqdflZoneGroupData',
    method: 'get',
    params: query,
    timeout: 30000
  })
}

// 获取责任单位满意率地市分组数据
export function listZrdwmylZoneGroupData(query) {
  return request({
    url: '/datav/overview/listZrdwmylZoneGroupData',
    method: 'get',
    params: query,
    timeout: 30000
  })
}

// 获取一次性化解率地市分组数据
export function listOneHjlZoneGroupData(query) {
  return request({
    url: '/datav/overview/listOneHjlZoneGroupData',
    method: 'get',
    params: query,
    timeout: 30000
  })
}

// 获取初件同比地市分组数据
export function listFirstYOYZoneGroupData(query) {
  return request({
    url: '/datav/overview/listFirstYOYZoneGroupData',
    method: 'get',
    params: query,
    timeout: 30000
  })
}

// 获取重件数据
export function getRepeatData(query) {
  return request({
    url: '/datav/overview/getRepeatData',
    method: 'get',
    params: query,
    timeout: 30000
  })
}

// 获取月三率数据
export function getMonthThreeRateData(query) {
  return request({
    url: '/datav/overview/getMonthThreeRateData',
    method: 'get',
    params: query,
    timeout: 30000
  })
}

// 按期答复率超期数据
export function getAqdflCqData(query) {
    return request({
        url: '/datav/overview/getAqdflCqData',
        method: 'get',
        params: query,
        timeout: 30000
    })
}

// 获取责任单位不满意数据
export function getZrdwBmyData(query) {
    return request({
        url: '/datav/overview/getZrdwBmyData',
        method: 'get',
        params: query,
        timeout: 30000
    })
}
