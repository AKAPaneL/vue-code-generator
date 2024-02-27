
/** 积分文章相关接口 **/
import request from '@/router/axios';

const baseUrl = process.env.VUE_APP_BASE_API_URL + '/blade-acticle/article'

export const searchUrl = baseUrl + '/list'

// 获取积分文章列表
export const getPointArticleList = (params)=>{
    return request({
        url: baseUrl + '/list',
        post:'get',
        params,
    })
}

// 获取积分文章树状结构
export const getPointArticleTree = (params)=>{
  return request({
      url: baseUrl + '/tree',
      post:'get',
      params,
  })
}

// 获取积分文章详情
export const getPointArticleDetail = (params)=>{
    return request({
        url: baseUrl + '/detail',
        post:'get',
        params,
    })
}

// 保存积分文章详情
export const savePointArticleDetail = (data)=>{
    return request({
        url: baseUrl + '/submit',
        method: 'post',
        data,
    })
}

// 删除积分文章
export const removePointArticle = (params)=>{
    return request({
        url: baseUrl + '/remove',
        method: 'get',
        params,
    })
}
