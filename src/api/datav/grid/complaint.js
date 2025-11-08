import request from '@/utils/request'


// 查询网内容分类
export function getCententTypeList(data) {
  return request({
    url: '/datav/complaint/cententTypeList',
    method: 'get',
    params: data
  })
}

// 新增网格投诉
export function addComplaint(data) {
  return request({
    url: '/datav/complaint',
    method: 'post',
    data: data
  })
}


