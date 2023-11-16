const fs = require("fs");
const config = require("./config/config");
const myUtil = require("./utils/camelCase")
const { getTreePageTemplate, getTreePageCss, getTreePageJs } = require('./template/treeTemplate');

const pagePath = "./result/views"; //生成的文件放在哪个文件

//判断文件是否存在, 不存在就创建
if (!fs.existsSync(pagePath)) {
    fs.mkdirSync(pagePath);
}


// 创建 树结构页面 数据
const createTreePage = (config)=>{
    for (const mode in config) {

        const pageFilePath = pagePath + "/" + mode; //顶部菜单生成的文件目录
        if (!fs.existsSync(pageFilePath)) {
            fs.mkdirSync(pageFilePath);
        }
        
        // 取出type 为tree 的数据
        const treeConfig = config[mode].filter(item=>item.type==='tree')
        treeConfig.forEach(item=>{
            // 基础文件名称
            const baseFileName = myUtil.toSmallCamelCase(item.subMenu);
            const vueContent = getTreePageTemplate(item)
            const cssContent = getTreePageCss(item)
            const jsContent = getTreePageJs(item)
            
            const treePagePath = pageFilePath + `/${item.subMenu}` ; // 先创建由subMenu 生成的文件目录
            if (!fs.existsSync(treePagePath)) {
                fs.mkdirSync(treePagePath);
            }
            // 创建三个文件
            fs.writeFileSync(`${treePagePath}/${baseFileName}.vue`, vueContent);
            fs.writeFileSync(`${treePagePath}/${baseFileName}.js`, jsContent);
            fs.writeFileSync(`${treePagePath}/${baseFileName}.scss`, cssContent);
        })
    }
}

createTreePage(config)