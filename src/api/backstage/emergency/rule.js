import request from '@/utils/request'

// 查询风险规则列表
export function listRule(query) {
    return request({
        url: '/emergency/rule/list',
        method: 'get',
        params: query
    })
}

// 查询风险规则详细
export function getRule(ruleId) {
    return request({
        url: '/emergency/rule/' + ruleId,
        method: 'get'
    })
}

// 新增风险规则
export function addRule(data) {
    return request({
        url: '/emergency/rule',
        method: 'post',
        data: data
    })
}

// 修改风险规则
export function updateRule(data) {
    return request({
        url: '/emergency/rule',
        method: 'put',
        data: data
    })
}

// 删除风险规则
export function delRule(ruleId) {
    return request({
        url: '/emergency/rule/' + ruleId,
        method: 'delete'
    })
}

// 设置风险规则启停用状态
export function setStatus(ruleId) {
    return request({
        url: '/emergency/rule/status/' + ruleId,
        method: 'post'
    })
}

// 获取风险流程
export function listProcess() {
    return request({
        url: '/emergency/rule/process',
        method: 'get'
    })
}

// 获取风险资源
export function listResources() {
    return request({
        url: '/emergency/rule/resources',
        method: 'get'
    })
}
