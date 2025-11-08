import request from '@/utils/request'

// 获取重点工作数据
export function getFocusData() {
  return request({
    url: '/datav/focusData/getFocusData',
    method: 'get',
    params: {},
    timeout:30000
  })
}

// 获取今日办结重点工作数据
export function getToDayEndFocusData() {
  return request({
    url: '/datav/focusData/getToDayEndFocusData',
    method: 'get',
    params: {},
    timeout:30000
  })
}

// 获取重点工作国家局登记数据
export function getFocusNumByNationalData() {
  return request({
    url: '/datav/focusData/getFocusNumByNationalData',
    method: 'get',
    params: {},
    timeout:30000
  })
}

// 获取重点工作本地区登记数据
export function getFocusNumByLocalData() {
  return request({
    url: '/datav/focusData/getFocusNumByLocalData',
    method: 'get',
    params: {},
    timeout:30000
  })
}

// 获取重点工作本机构登记数据
export function getFocusNumByOrgData() {
  return request({
    url: '/datav/focusData/getFocusNumByOrgData',
    method: 'get',
    params: {},
    timeout:30000
  })
}

// 获取重点工作办理情况国家局登记数据
export function getFocusHandleByNationalData() {
  return request({
    url: '/datav/focusData/getFocusHandleByNationalData',
    method: 'get',
    params: {},
    timeout:30000
  })
}

// 获取重点工作办理情况本地区登记数据
export function getFocusHandleByLocalData() {
  return request({
    url: '/datav/focusData/getFocusHandleByLocalData',
    method: 'get',
    params: {},
    timeout:30000
  })
}

// 获取重点工作办理情况本机构登记数据
export function getFocusHandleByOrgData() {
  return request({
    url: '/datav/focusData/getFocusHandleByOrgData',
    method: 'get',
    params: {},
    timeout:30000
  })
}
