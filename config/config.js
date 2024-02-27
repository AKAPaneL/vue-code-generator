// type: 类型：tree or list
const config = [
    {
        topMenu : 'article',
        subMenu : 'article-reply',
        title: '文章留言',
        baseUrl : "process.env.VUE_APP_BASE_API_URL + '/blade-acticle/article-reply'",
        type:'tree',        //树状结构
        mainField:[
            { name:'articleClassName', text:'文章分类名称', type:'text' },
            { name:'parentClassId', text:'父级分类', type:'text' },
        ]
    },
]


const configMapping = config.reduce((acc,item)=>{
    if(!acc.hasOwnProperty(item.topMenu)){
        acc[item.topMenu] = []
    }
    acc[item.topMenu].push(item)
    return acc
},{})

module.exports = configMapping