const fs = require("fs");
const config = require("./config/config");
const myUtil = require("./utils/camelCase")

const routePath = "./result/router/views";

//判断文件是否存在, 不存在就创建
if (!fs.existsSync(routePath)) {
  fs.mkdirSync(routePath);
}

function createRouter(config) {
  // 给每个文件夹创建页面文件
  for (const mode in config) {
    const modeName = myUtil.toSmallCamelCase(mode)
    const routes = config[mode].reduce((acc, item) => {
      const { topMenu, subMenu, title } = item;
      const basePath = `/${topMenu}/${subMenu}`;
      const fileName = `${myUtil.toSmallCamelCase(subMenu)}`;
      const singleRoute = `
    /** ${title} **/
    {
        path: "${basePath}-list", 
        component: () => import("@/views${basePath}/list/${fileName}List.vue"),
        name: "${title}",
        children:[{
            path: 'v',
            name: '编辑${title}',
            component: () => import("@/views${basePath}/voucher/${fileName}Voucher.vue"),
            }],
        meta: { title: "${title}" },
    },
    `;
      acc += singleRoute;
      return acc;
    }, ``);

    const content = `const ${modeName}  = [
        ${routes}
];

export default ${modeName}
`;
    console.log(content);
    fs.writeFileSync(`${routePath}/router-${modeName}.js`, content);
  }
}

createRouter(config);
