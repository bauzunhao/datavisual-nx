import request from '@/utils/request'

// 查询图片资源列表
export function listPictureResources(query) {
  return request({
    url: '/backstage/publicity/list',
    method: 'get',
    params: query
  })
}

// 查询图片资源详细
export function getPictureResources(videoImageId) {
  return request({
    url: '/backstage/publicity/educate/' + videoImageId,
    method: 'get'
  })
}

// 新增图片资源
export function addPictureResources(data) {
  return request({
    url: '/backstage/publicity',
    method: 'post',
    data: data
  })
}

// 修改图片资源
export function updatePictureResources(data) {
  return request({
    url: '/backstage/publicity',
    method: 'put',
    data: data
  })
}

// 删除图片资源
export function delPictureResources(videoImageId) {
  return request({
    url: '/backstage/publicity/' + videoImageId,
    method: 'delete'
  })
}

/**
 * 设置图片资源状态
 * @param videoImageId
 * @returns {*}
 */
export function setPictureResourcesStatus(videoImageId) {
    return request({
        url: '/backstage/publicity/status/' + videoImageId,
        method: 'post'
    })
}

/**
 * 设置图片上下屏状态
 * @param videoImageId
 * @returns {*}
 */
export function setPictureResourcesLargeScreen(videoImageId) {
    return request({
        url: '/backstage/publicity/screen/' + videoImageId,
        method: 'post'
    })
}
