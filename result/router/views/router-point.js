const point  = [
        
    /** 积分文章 **/
    {
        path: "/point/point-article-list", 
        component: () => import("@/views/point/point-article/list/pointArticleList.vue"),
        name: "积分文章",
        children:[{
            path: 'v',
            name: '编辑积分文章',
            component: () => import("@/views/point/point-article/voucher/pointArticleVoucher.vue"),
            }],
        meta: { title: "积分文章" },
    },
    
];

export default point
