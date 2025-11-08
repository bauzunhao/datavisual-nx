import request from '@/utils/request'

// 查询联动指挥的事件详情
export function getLinkageEventDetail(data) {
    return request({
        url: '/datav/linkage/detail',
        method: 'post',
        data: data
    });
}

// 获取联动指挥常见短信接收人列表
export function getLinkageSmsReceiver(data) {
    return request({
        url: '/datav/linkage/sms/receiver/info',
        method: 'post',
        data: data
    });
}

// 联动指挥短信发送
export function linkageSendSms(data) {
    return request({
        url: '/datav/linkage/sms/receiver/send',
        method: 'put',
        data: data
    });
}

// 联动指挥信访详情信息（流转记录，办理情况此类）
export function getLinkagePetitionInfo(query) {
    return request({
        url: '/general/petition/info',
        method: 'get',
        params: query
    });
}
