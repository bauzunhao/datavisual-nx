import request from '@/utils/request'

export function listArchiveData(query) {
    return request({
        url: '/work/archive/listData',
        method: 'get',
        params: query,
        timeout: 30000
    })
}

export function generateArchive(data) {
    return request({
        url: '/work/archive/generate',
        method: 'post',
        data: data
    })
}
