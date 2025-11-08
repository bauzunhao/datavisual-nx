import request from '@/utils/request'

// 查询网格信访用户列表
export function listUser(query) {
  return request({
    url: '/grid/petition/user/list',
    method: 'get',
    params: query
  })
}

// 查询网格信访用户详细
export function getUser(id) {
  return request({
    url: '/grid/petition/user/' + id,
    method: 'get'
  })
}

// 新增网格信访用户
export function addUser(data) {
  return request({
    url: '/grid/petition/user',
    method: 'post',
    data: data
  })
}

// 修改网格信访用户
export function updateUser(data) {
  return request({
    url: '/grid/petition/user',
    method: 'put',
    data: data
  })
}

// 删除网格信访用户
export function delUser(id) {
  return request({
    url: '/grid/petition/user/' + id,
    method: 'delete'
  })
}

export function setStatus(id) {
    return request({
        url: '/grid/petition/user/status/' + id,
        method: 'post'
    })
}

export function setAuth(data) {
    return request({
        url: '/grid/petition/user/auth',
        method: 'post',
        data: data
    })
}
