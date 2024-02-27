
/** 积分商品档案相关接口 **/
import request from '@/router/axios';

const baseUrl = process.env.VUE_APP_BASE_API_URL + '/blade-point/point-sku'

export const searchUrl = baseUrl + '/list'

// 获取积分商品档案列表
export const getPointSkuList = (params)=>{
    return request({
        url: baseUrl + '/list',
        post:'get',
        params,
    })
}

// 获取积分商品档案树状结构
export const getPointSkuTree = (params)=>{
  return request({
      url: baseUrl + '/tree',
      post:'get',
      params,
  })
}

// 获取积分商品档案详情
export const getPointSkuDetail = (params)=>{
    return request({
        url: baseUrl + '/detail',
        post:'get',
        params,
    })
}

// 保存积分商品档案详情
export const savePointSkuDetail = (data)=>{
    return request({
        url: baseUrl + '/submit',
        method: 'post',
        data,
    })
}

// 删除积分商品档案
export const removePointSku = (params)=>{
    return request({
        url: baseUrl + '/remove',
        method: 'get',
        params,
    })
}
