
/** 认证系统设置相关接口 **/
import request from '@/router/axios';

const baseUrl = process.env.VUE_APP_BASE_API_URL + '/blade-atte/atte-app-setting'

// 获取认证系统设置列表
export const getAuthSystemSettingList = (params)=>{
    return request({
        url: baseUrl + '/list',
        post:'get',
        params,
    })
}

// 获取认证系统设置详情
export const getAuthSystemSettingDetail = (params)=>{
    return request({
        url: baseUrl + '/detail',
        post:'get',
        params,
    })
}

// 保存认证系统设置详情
export const saveAuthSystemSettingDetail = (data)=>{
    return request({
        url: baseUrl + '/submit',
        method: 'post',
        data,
    })
}

// 删除认证系统设置
export const removeAuthSystemSetting = (params)=>{
    return request({
        url: baseUrl + '/remove',
        method: 'get',
        params,
    })
}
