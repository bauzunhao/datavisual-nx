import request from '@/utils/request'


// 获取最新数据
export function getPageListData(query) {
    return request({
        url: '/datav/videoPicture/getPageListData',
        method: 'get',
        params: query,
        timeout:30000
    })
}
