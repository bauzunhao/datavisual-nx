import request from '@/utils/request'

// 查询短信常见接收人列表
export function listReceiver(query) {
  return request({
    url: '/linkage/sms/receiver/list',
    method: 'get',
    params: query
  })
}

// 查询短信常见接收人详细
export function getReceiver(recvId) {
  return request({
    url: '/linkage/sms/receiver/' + recvId,
    method: 'get'
  })
}

// 新增短信常见接收人
export function addReceiver(data) {
  return request({
    url: '/linkage/sms/receiver',
    method: 'post',
    data: data
  })
}

// 修改短信常见接收人
export function updateReceiver(data) {
  return request({
    url: '/linkage/sms/receiver',
    method: 'put',
    data: data
  })
}

// 删除短信常见接收人
export function delReceiver(recvId) {
  return request({
    url: '/linkage/sms/receiver/' + recvId,
    method: 'delete'
  })
}

export function loadSmsTemplete() {
  return request({
    url: '/linkage/sms/receiver/templete',
    method: 'get'
  })
}

export function saveSmsTemplete(data) {
  return request({
    url: '/linkage/sms/receiver/templete',
    method: 'put',
    data: data
  })
}
