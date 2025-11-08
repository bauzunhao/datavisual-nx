import request from '@/utils/request'

export function getList(query) {
    return request({
        url: '/grid/complaint/list',
        method: 'get',
        params: query
    });
}

export function getComplaint(id) {
    return request({
        url: '/grid/complaint/' + id,
        method: 'get'
    })
}

export function updateEvaluate(id, evaluate) {
    const data = {
        id,
        evaluate
    }
    return request({
        url: '/grid/complaint/evaluate',
        method: 'put',
        params: data
    })
}
