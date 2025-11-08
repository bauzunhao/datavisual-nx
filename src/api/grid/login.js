import request from '@/utils/request'
// 登录方法
export function login(data) {
    return request({
        url: '/grid/petition/user/login',
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}


export function getSMSCode(username, code, uuid) {
    const data = {
        username,
        code,
        uuid
    }
    return request({
        url: '/code',
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}

// 注册方法
export function register(data) {
    return request({
        url: '/register',
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}

// 获取用户详细信息
export function getInfo() {
    return request({
        url: '/getInfo',
        method: 'get'
    })
}

// 退出方法
export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}

// 获取验证码
export function getCodeImg() {
    return request({
        url: '/captchaImage',
        headers: {
            isToken: false
        },
        method: 'get',
        timeout: 20000
    })
}
