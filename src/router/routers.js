//routers.js
export default [{
        path: '/',
        component: resolve => require(['../views/home.vue'], resolve),
        children: [{
                path: '/',
                name: 'home',
                component: resolve => require(['../views/index.vue'], resolve)
            }]
    },
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['../views/login.vue'], resolve)
    },
    // {
    //     path: '/500',
    //     name: 'error_500',
    //     component: resolve => require(['../views/error/500.vue'], resolve)
    // },
    // {
    //     path: '/401',
    //     name: 'error_401',
    //     component: resolve => require(['../views/error/401.vue'], resolve)
    // },
    // { // 404
    //     path: '*',
    //     name: 'error_404',
    //     component: resolve => require(['../views/error/404.vue'], resolve)
    // }
];