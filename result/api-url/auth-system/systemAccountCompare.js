
/** 系统账号匹配相关接口 **/
import request from '@/router/axios';

const baseUrl = process.env.VUE_APP_BASE_API_URL + '/blade-system/atte-app-account-compare'

// 获取系统账号匹配列表
export const getSystemAccountCompareList = (params)=>{
    return request({
        url: baseUrl + '/list',
        post:'get',
        params,
    })
}

// 获取系统账号匹配详情
export const getSystemAccountCompareDetail = (params)=>{
    return request({
        url: baseUrl + '/detail',
        post:'get',
        params,
    })
}

// 保存系统账号匹配详情
export const saveSystemAccountCompareDetail = (data)=>{
    return request({
        url: baseUrl + '/submit',
        method: 'post',
        data,
    })
}

// 删除系统账号匹配
export const removeSystemAccountCompare = (params)=>{
    return request({
        url: baseUrl + '/remove',
        method: 'get',
        params,
    })
}
