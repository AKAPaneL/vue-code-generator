const buscard  = [
        
    /** 名片模板组 **/
    {
        path: "/buscard/buscard-fitup-group-list", 
        component: () => import("@/views/buscard/buscard-fitup-group/list/buscardFitupGroupList.vue"),
        name: "名片模板组",
        children:[{
            path: 'v',
            name: '编辑名片模板组',
            component: () => import("@/views/buscard/buscard-fitup-group/voucher/buscardFitupGroupVoucher.vue"),
            }],
        meta: { title: "名片模板组" },
    },
    
];

export default buscard
