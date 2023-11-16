// type: 类型：tree or list
const config = [
    {
        topMenu : 'auth-system',
        subMenu : 'system-scheme-config',
        title: '认证系统设置',
        baseUrl : "process.env.VUE_APP_BASE_API_URL + '/blade-atte/atte-app-setting'",
        type:'tree',        //树状结构
        mainField:[
            { name:'schemeName', text:'方案名称', type:'text' },
            { name:'screenLink', text:'大屏跳转链接', type:'text' },
        ]
    }
]


const configMapping = config.reduce((acc,item)=>{
    if(!acc.hasOwnProperty(item.topMenu)){
        acc[item.topMenu] = []
    }
    acc[item.topMenu].push(item)
    return acc
},{})

module.exports = configMapping