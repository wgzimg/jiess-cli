//routers.js
export default [{
		path: '/',
		component: resolve => require(['../views/home.vue'], resolve),
		children: [{
			path: '/',
			name: 'home',
			component: resolve => require(['../views/index.vue'], resolve),
			meta:{
				title:'首页'
			}
		}]
	},
	{
		path: '/login',
		name: 'login',
		component: resolve => require(['../views/login.vue'], resolve)
	},
];
