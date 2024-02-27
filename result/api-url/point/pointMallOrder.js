
/** 积分订单相关接口 **/
import request from '@/router/axios';

const baseUrl = process.env.VUE_APP_BASE_API_URL + '/blade-point/point-order'

export const searchUrl = baseUrl + '/list'

// 获取积分订单列表
export const getPointMallOrderList = (params)=>{
    return request({
        url: baseUrl + '/list',
        post:'get',
        params,
    })
}

// 获取积分订单树状结构
export const getPointMallOrderTree = (params)=>{
  return request({
      url: baseUrl + '/tree',
      post:'get',
      params,
  })
}

// 获取积分订单详情
export const getPointMallOrderDetail = (params)=>{
    return request({
        url: baseUrl + '/detail',
        post:'get',
        params,
    })
}

// 保存积分订单详情
export const savePointMallOrderDetail = (data)=>{
    return request({
        url: baseUrl + '/submit',
        method: 'post',
        data,
    })
}

// 删除积分订单
export const removePointMallOrder = (params)=>{
    return request({
        url: baseUrl + '/remove',
        method: 'get',
        params,
    })
}
