const authSystem  = [
        
    /** 用户管理列表 **/
    {
        path: "/auth-system/auth-user-info-list", 
        component: () => import("@/views/auth-system/auth-user-info/list/authUserInfoList.vue"),
        name: "用户管理列表",
        children:[{
            path: 'v',
            name: '编辑用户管理列表',
            component: () => import("@/views/auth-system/auth-user-info/voucher/authUserInfoVoucher.vue"),
            }],
        meta: { title: "用户管理列表" },
    },
    
    /** 用户匹配歧义表 **/
    {
        path: "/auth-system/auth-user-ambiguity-list", 
        component: () => import("@/views/auth-system/auth-user-ambiguity/list/authUserAmbiguityList.vue"),
        name: "用户匹配歧义表",
        children:[{
            path: 'v',
            name: '编辑用户匹配歧义表',
            component: () => import("@/views/auth-system/auth-user-ambiguity/voucher/authUserAmbiguityVoucher.vue"),
            }],
        meta: { title: "用户匹配歧义表" },
    },
    
];

export default authSystem
