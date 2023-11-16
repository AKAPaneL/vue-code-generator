
/** 用户匹配歧义表相关接口 **/
import request from '@/router/axios';

const baseUrl = process.env.VUE_APP_BASE_API_URL + '/blade-system/atte-user-ambiguity'

// 获取用户匹配歧义表列表
export const getAuthUserAmbiguityList = (params)=>{
    return request({
        url: baseUrl + '/list',
        post:'get',
        params,
    })
}

// 获取用户匹配歧义表详情
export const getAuthUserAmbiguityDetail = (params)=>{
    return request({
        url: baseUrl + '/detail',
        post:'get',
        params,
    })
}

// 保存用户匹配歧义表详情
export const saveAuthUserAmbiguityDetail = (data)=>{
    return request({
        url: baseUrl + '/submit',
        method: 'post',
        data,
    })
}

// 删除用户匹配歧义表
export const removeAuthUserAmbiguity = (params)=>{
    return request({
        url: baseUrl + '/remove',
        method: 'get',
        params,
    })
}
