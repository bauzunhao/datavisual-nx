import request from '@/utils/request'

// 查询网格用户列表
export function listUser(query) {
    return request({
        url: '/grid/user/list',
        method: 'get',
        params: query
    })
}

// 查询网格用户详细
export function getUser(id) {
    return request({
        url: '/grid/user/' + id,
        method: 'get'
    })
}

// 新增网格用户
export function addUser(data) {
    return request({
        url: '/grid/user',
        method: 'post',
        data: data
    })
}

// 修改网格用户
export function updateUser(data) {
    return request({
        url: '/grid/user',
        method: 'put',
        data: data
    })
}

// 删除网格用户
export function delUser(id) {
    return request({
        url: '/grid/user/' + id,
        method: 'delete'
    })
}

// 设置停用状态
export function setStatus(id) {
    return request({
        url: '/grid/user/status/' + id,
        method: 'post'
    })
}
