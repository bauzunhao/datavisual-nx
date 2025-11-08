import request from '@/utils/request'

// 查询统计数据
export function getStatisticsData(query) {
  return request({
    url: '/datav/overview/getOverviewData',
    method: 'get',
    params: query,
    timeout:60000
  })
}

// 查询地市分组数据
export function getZoneGroupData(query) {
  return request({
    url: '/datav/overview/getOverviewZoneGroupData',
    method: 'get',
    params: query,
    timeout:30000
  })
}

// 获取信访概览一级内容前五数据
export function getContentTypeOneData(query) {
  return request({
    url: '/datav/overview/getContentTypeOneData',
    method: 'get',
    params: query,
    timeout:30000
  })
}

// 获取进京访初重数据
export function getJjfIsRepeatData(query) {
  return request({
    url: '/datav/overview/getJjfIsRepeatData',
    method: 'get',
    params: query,
    timeout:30000
  })
}

// 查询进京访地市分组数据
export function getJjfZoneGroupData(query) {
  return request({
    url: '/datav/overview/getJjfZoneGroupData',
    method: 'get',
    params: query,
    timeout:30000
  })
}

// 获取近三年信访量月趋势
export function getMonthGroupData() {
    return request({
        url: '/datav/overview/getMonthGroupData',
        method: 'get',
        params: {},
        timeout:30000
    })
}

// 获取扬言数据
export function getThreatenData(query) {
    return request({
        url: '/datav/overview/getThreatenData',
        method: 'get',
        params: query,
        timeout:30000
    })
}

// 获取集体访数据
export function getJointData(query) {
    return request({
        url: '/datav/overview/getJointData',
        method: 'get',
        params: query,
        timeout:30000
    })
}

//获取扬言、集体访、进京访一级内容分类前五(从主表查询，因为扬言字段统计表中数据对应不上)
export function getTakeTypeContentTypeOneData(query) {
    return request({
        url: '/datav/overview/getTakeTypeContentTypeOneData',
        method: 'get',
        params: query,
        timeout:30000
    })
}
