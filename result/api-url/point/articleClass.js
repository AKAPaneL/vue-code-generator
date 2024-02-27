
/** 文章分类相关接口 **/
import request from '@/router/axios';

const baseUrl = process.env.VUE_APP_BASE_API_URL + '/blade-acticle/article-class/tree

export const searchUrl = baseUrl + '/list'

// 获取文章分类列表
export const getArticleClassList = (params)=>{
    return request({
        url: baseUrl + '/list',
        post:'get',
        params,
    })
}

// 获取文章分类树状结构
export const getArticleClassTree = (params)=>{
  return request({
      url: baseUrl + '/tree',
      post:'get',
      params,
  })
}

// 获取文章分类详情
export const getArticleClassDetail = (params)=>{
    return request({
        url: baseUrl + '/detail',
        post:'get',
        params,
    })
}

// 保存文章分类详情
export const saveArticleClassDetail = (data)=>{
    return request({
        url: baseUrl + '/submit',
        method: 'post',
        data,
    })
}

// 删除文章分类
export const removeArticleClass = (params)=>{
    return request({
        url: baseUrl + '/remove',
        method: 'get',
        params,
    })
}
