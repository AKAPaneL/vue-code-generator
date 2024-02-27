
/** 名片模板组相关接口 **/
import request from '@/router/axios';

const baseUrl = process.env.VUE_APP_BASE_API_URL + '/blade-system/common-group-template'

export const searchUrl = baseUrl + '/list'

// 获取名片模板组列表
export const getBuscardFitupGroupList = (params)=>{
    return request({
        url: baseUrl + '/list',
        post:'get',
        params,
    })
}

// 获取名片模板组树状结构
export const getBuscardFitupGroupTree = (params)=>{
  return request({
      url: baseUrl + '/tree',
      post:'get',
      params,
  })
}

// 获取名片模板组详情
export const getBuscardFitupGroupDetail = (params)=>{
    return request({
        url: baseUrl + '/detail',
        post:'get',
        params,
    })
}

// 保存名片模板组详情
export const saveBuscardFitupGroupDetail = (data)=>{
    return request({
        url: baseUrl + '/submit',
        method: 'post',
        data,
    })
}

// 删除名片模板组
export const removeBuscardFitupGroup = (params)=>{
    return request({
        url: baseUrl + '/remove',
        method: 'get',
        params,
    })
}
