const mall  = [
        
    /** 积分商品档案 **/
    {
        path: "/mall/point-sku-list", 
        component: () => import("@/views/mall/point-sku/list/pointSkuList.vue"),
        name: "积分商品档案",
        children:[{
            path: 'v',
            name: '编辑积分商品档案',
            component: () => import("@/views/mall/point-sku/voucher/pointSkuVoucher.vue"),
            }],
        meta: { title: "积分商品档案" },
    },
    
    /** 积分订单 **/
    {
        path: "/mall/point-mall-order-list", 
        component: () => import("@/views/mall/point-mall-order/list/pointMallOrderList.vue"),
        name: "积分订单",
        children:[{
            path: 'v',
            name: '编辑积分订单',
            component: () => import("@/views/mall/point-mall-order/voucher/pointMallOrderVoucher.vue"),
            }],
        meta: { title: "积分订单" },
    },
    
];

export default mall
