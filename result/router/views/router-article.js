const article  = [
        
    /** 文章留言 **/
    {
        path: "/article/article-reply-list", 
        component: () => import("@/views/article/article-reply/list/articleReplyList.vue"),
        name: "文章留言",
        children:[{
            path: 'v',
            name: '编辑文章留言',
            component: () => import("@/views/article/article-reply/voucher/articleReplyVoucher.vue"),
            }],
        meta: { title: "文章留言" },
    },
    
];

export default article
