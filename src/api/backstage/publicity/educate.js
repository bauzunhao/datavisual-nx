import request from '@/utils/request'

// 查询视频图片资源列表
export function listResources(query) {
    return request({
        url: '/backstage/publicity/list',
        method: 'get',
        params: query
    })
}

// 查询视频图片资源详细
export function getResources(videoImageId) {
    return request({
        url: '/backstage/publicity/educate/' + videoImageId,
        method: 'get'
    })
}

// 查询视频图片资源详细
export function getResourcesIds(videoImageId) {
    return request({
        url: '/backstage/publicity/educates/' + videoImageId,
        method: 'get'
    })
}

// 新增视频资源
export function addResources(data) {
    return request({
        url: '/backstage/publicity',
        method: 'post',
        data: data
    })
}

// 修改视频资源
export function updateResources(data) {
    return request({
        url: '/backstage/publicity',
        method: 'put',
        data: data
    })
}
// 删除视频图片资源
export function delResources(videoImageId) {
    return request({
        url: '/backstage/publicity/' + videoImageId,
        method: 'delete'
    })
}


// 设置应急规则启停用状态
export function setStatus(videoImageId) {
    return request({
        url: '/backstage/publicity/status/' + videoImageId,
        method: 'post'
    })
}

// 设置停用状态
export function setStatusIds(videoImageId) {
    return request({
        url: '/backstage/publicity/statusIds/' + videoImageId,
        method: 'post'
    })
}


// 设置大屏上传状态
export function  setVideoImgSetting(videoImageId) {
    return request({
        url: '/backstage/publicity/videoImgSets/' + videoImageId,
        method: 'post'
    })
}

// 设置大屏上传状态
export function setVideoImgSet(videoImageId) {
    return request({
        url: '/backstage/publicity/videoImgSet/' + videoImageId,
        method: 'post'
    })
}

/**
 * 设置视频上下屏状态
 * @param videoImageId
 * @returns {*}
 */
export function setVideoResourcesLargeScreen(videoImageId) {
    return request({
        url: '/backstage/publicity/screen/' + videoImageId,
        method: 'post'
    })
}
