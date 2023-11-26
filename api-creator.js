const fs = require("fs");
const config = require("./config/config");
const myUtil = require("./utils/camelCase")

const apiPath = "./result/api-url";

//判断文件是否存在, 不存在就创建
if (!fs.existsSync(apiPath)) {
  fs.mkdirSync(apiPath);
}

function createApiFile(config) {
  // 给每个模块创建接口文件
  for (const mode in config) {
    const apiFile = apiPath + "/" + mode;

    if (!fs.existsSync(apiFile)) {
      fs.mkdirSync(apiFile);
    }

    config[mode].forEach((item) => {
      const { baseUrl, title, subMenu } = item;
      const fnName = myUtil.toBigCamelCase(subMenu);
      const singleApiFileContent = `
/** ${title}相关接口 **/
import request from '@/router/axios';

const baseUrl = ${baseUrl}

export const searchUrl = baseUrl + '/list'

// 获取${title}列表
export const get${fnName}List = (params)=>{
    return request({
        url: baseUrl + '/list',
        post:'get',
        params,
    })
}

// 获取${title}树状结构
export const get${fnName}Tree = (params)=>{
  return request({
      url: baseUrl + '/tree',
      post:'get',
      params,
  })
}

// 获取${title}详情
export const get${fnName}Detail = (params)=>{
    return request({
        url: baseUrl + '/detail',
        post:'get',
        params,
    })
}

// 保存${title}详情
export const save${fnName}Detail = (data)=>{
    return request({
        url: baseUrl + '/submit',
        method: 'post',
        data,
    })
}

// 删除${title}
export const remove${fnName} = (params)=>{
    return request({
        url: baseUrl + '/remove',
        method: 'get',
        params,
    })
}
`;

    fs.writeFileSync(`${apiFile}/${myUtil.toSmallCamelCase(subMenu)}.js`, singleApiFileContent);
    });
  }
}

createApiFile(config);
