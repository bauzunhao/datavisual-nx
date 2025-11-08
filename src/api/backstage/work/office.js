import request from '@/utils/request'

// 查询办公常用数据
export function listData(query) {
  return request({
    url: '/work/office/getWorkOfficeData',
    method: 'get',
    params: query,
    timeout:60000
  })
}

// 查询登记单位
export function listRegisterUnit() {
  return request({
    url: '/work/office/getRegisterUnitList',
    method: 'get',
    timeout:20000
  })
}

