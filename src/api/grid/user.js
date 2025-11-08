import request from '@/utils/request'

// 查询网格信访用户详细
export function getUser(id) {
    return request({
        url: '/grid/petition/user/' + id,
        method: 'get'
    })
}

export function getDetail() {
    return request({
        url: '/grid/petition/user/info',
        method: 'get'
    })
}

// 修改网格信访用户
export function updateUser(data) {
    return request({
        url: '/grid/petition/user/update',
        method: 'put',
        data: data
    })
}

// 修改网格信访用户密码
export function updateUserPwd(oldPassword, newPassword) {
    const data = {
        oldPassword,
        newPassword
    }
    return request({
        url: '/grid/petition/user/updatePwd',
        method: 'put',
        params: data
    })
}
