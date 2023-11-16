const fs = require('fs')


//判断文件是否存在, 不存在就创建
if (!fs.existsSync('./router/views')) {
    fs.mkdirSync('./router/views')
}