## <span id="api-describe">前言</span>
总所周知，开发一套系统耗时耗力，短则几月，长则数年，中间的零零总总，实在让开发人员头疼，这方面我本人深有体会，经过两年多的系统开发沉淀，以及多套系统底层封装的经验，于是 **vue-jiess-admin** 应运而生

### 什么是 vue-jiess-admin 
**vue-jiess-admin** 是一套基于**element-ui**封装的一套系统管理框架，以传统的左侧边栏布局为蓝本，针对列表页，添加编辑页，弹框页，标签头，底层路由进行拓展，内置多个组件，以参数配置作为核心（即给组件配置生成所需）让开发人员只用专注于逻辑，而尽可能避免把经历耗费在UI界面上，提升开发效率

------

### 框架特点
- [x] f5刷新页面，当页停留
- [x] 书写底层路由拦截，对页面自动token验证
- [x] 对内置组件传入参数，即可生成列表页，编辑添加页，弹框页
- [x] 在每个页面中注入了values（表单的数据）,并且配置页面中暴露this对象，使赋值和组件联动变得轻松

----

## <span id="api-install">安装</span>
### 安装说明
**vue-jiess-admin** 依赖于vue-cli3.0框架，安装分为3步
> * npm或cnpm安装**vue-jiess-admin**依赖
> * 创建相关配置文件并引入
> * 引入**vue-jiess-admin**并注入相关配置

#### 推荐使用npm安装
推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

```javascript
npm i vue-jiess-admin -S
```

#### 创建配置文件
在src目录下创建 文件夹config 并放入文件 index.js和mapping.js
鉴于全局多处会用到jiess对象，所以统一配置index.js，只用引入@/config即可
```javascript
//index.js 
import jiessAdmin from 'vue-jiess-admin'
import Vue from 'vue'
import App from '../App.vue'
import router from '../router'
import store from '../store'
import mapping from './mapping'
import VueRouter from 'vue-router'

export const jiess = jiessAdmin

export default {
	Vue,
	App,
	router,
	store,
	mapping,
	VueRouter
}
```
mapping.js 用于配置常用字段的映射关系，后需要将其传给vue-jiess-admin
```javascript
//mapping.js 
//字段的映射关系或常量
export default {
	TOKEN: 'Token',
	//隐藏组件的唯一常量，定义好后不要更改
	HIDE_DOM: '***隐藏***',
	//用户数据源
	USER_DATA: 'userData',
	//首页name
	HOME_PAGE_NAME: 'home',
	//登陆页name
	LOGIN_PAGE_NAME: 'login',
	//注册页name
	REGISTER_PAGE_NAME: 'register',
	//关闭所有的虚拟路由name
	CLOSE_ALL_TABS_NAME: 'closeAll',
	//当前页面对于路由参数对象
	PAGE_PATH_ITEM: 'jiess-page-item',
	//下拉框字段映射
	selectOptionValue: 'Id',
	selectOptionLabel: 'Value',
	//登录
	username: 'LogonName',
	password: 'Pwd',
	//列表
	page: 'Page',
	limit: 'Limit',
	orderby: 'OrderBy',
	search: 'Search',
	//真实名称
	realName: 'realName',
	//公司名称
	companyName: 'companyName',
	//头像
	avatar: 'avatar',
	//到期时间
	expiryTime: 'expiryTime',
	// token在Cookie中存储的天数，默认1天
	cookieExpires: 1,
	// API 默认请求路径
	baseUrl: process.env.VUE_APP_API,
	// Mock URL前缀
	mockUrl: process.env.VUE_APP_MOCK_URL || '',
	//侧边栏主层级name
	submenuName: 'ModuleName',
	//侧边栏主层级id
	submenuIndex: 'ModuleId',
	//侧边栏子层级键名
	submenuChildren: 'MenuInfoModelList',
	//侧边栏子层级name
	submenuChildrenName: 'ModuleName',
	//侧边栏子层级点击后返回数据
	submenuChildrenData: 'ChildrenData',
	//常见图标配置
	iconEdit: 'el-icon-edit-outline', //编辑
	iconSearch: 'el-icon-search', //搜索
	iconDelete: 'el-icon-delete', //删除
	iconRefresh: 'el-icon-refresh', //刷新
	iconLook: 'el-icon-view', //查看
	iconFabu: 'el-icon-goods', //发布
	iconXiaJia: 'el-icon-sold-out', //下架
	iconTuiJian: 'el-icon-star-on', //推荐
	iconZanTing: 'el-icon-remove-outline', //暂停
	iconFenPei: 'el-icon-setting', //分配
	iconMenu: 'el-icon-menu', //侧边栏主菜单
	iconSubMenu: 'el-icon-minus', //侧边栏子级菜单
}
```
### 修改store ——vuex
删除原store.js 并新建文件夹store,并放入文件index.js user.js

```javascript
//store/index.js
import user from './user'
export default {
    state: {
        progress: false
    },
    mutations: {
        //
    },
    actions: {
        //
    },
    modules: {
        user,
    }
}
```

```javascript
//store/user.js
import {
	http_login,
	http_regedit,
	UnLogin,
	GetAuthorityTree,
	GetCommonAuthority,
	GetTableHeads,
	AdminLogon,
} from '@/api/urls'
import mapping from '@/config/mapping'
import Cookies from 'js-cookie'
export default {
	state: {
		token: Cookies.get(mapping.TOKEN),
		userdata: undefined,
		//权限树数据
		AuthorityTree: undefined,
		CommonAuthority: undefined,
		TableHeads: undefined,
		//当前权限
		currentAuthority: undefined,
		//当前标题
		currentTableHead: undefined,
	},
	mutations: {
		setToken(state, token) {
			state.token = token
			Cookies.set(mapping.TOKEN, JSON.stringify(token))
		},
		setUserData(state, data) {
			state.userdata = data
			localStorage.setItem(mapping.USER_DATA, JSON.stringify(data))
		},
		setAuthorityTree(state, data) {
			state.AuthorityTree = data
		},
		setCommonAuthority(state, data) {
			state.CommonAuthority = data
		},
		setTableHeads(state, data) {
			state.TableHeads = data
		},
	},
	actions: {
		// 登录
		handleLogin({
			commit
		}, obj) {
			let _self = obj.self
			let userdata = obj.data

			_self.httpBack(http_login(userdata), res => {
				let data = res.data
				commit('setToken', data.token);
				commit('setUserData', data)
				_self.$message.success('登录成功');
				/**
				 * 请求相关的权限树
				 */
				let PromiseA = new Promise((resolve, reject) => {
					_self.httpBack(GetAuthorityTree(), res => {
						commit('setAuthorityTree', res.data);
						console.log('setAuthorityTree', res.data)
						window.localStorage.setItem('AuthorityTree', JSON.stringify(res.data))
						resolve()
					})
				})

				let PromiseB = new Promise((resolve, reject) => {
					_self.httpBack(GetCommonAuthority(), res => {
						commit('setCommonAuthority', res.data);
						window.localStorage.setItem('CommonAuthority', JSON.stringify(res.data))
						console.log('CommonAuthority', res.data)
						resolve()
					})
				})

				let PromiseC = new Promise((resolve, reject) => {
					_self.httpBack(GetTableHeads(), res => {
						commit('setTableHeads', res.data);
						window.localStorage.setItem('TableHeads', JSON.stringify(res.data))
						console.log('TableHeads', res.data)
						resolve()
					})
				})
				Promise.all([PromiseA, PromiseB, PromiseC]).then(() => {
					_self.$router.replace('/')
				})
			})
		},
		//获取权限树
		handleAuthority({
			commit,
			state
		}, obj) {
			let _self = obj.self
			let module = obj.module
			if (state.AuthorityTree && state.CommonAuthority && state.TableHeads) {
				//如果缓存中有权限数据，不做处理
			} else {
				//缓存中没有数据，则从本地拿取数据
				let AuthorityTree = JSON.parse(window.localStorage.getItem('AuthorityTree'))
				let CommonAuthority = JSON.parse(window.localStorage.getItem('CommonAuthority'))
				let TableHeads = JSON.parse(window.localStorage.getItem('TableHeads'))
				if (AuthorityTree && CommonAuthority && TableHeads) {
					//如果本地有权限数据则赋值给缓存
					state.AuthorityTree = AuthorityTree
					state.CommonAuthority = CommonAuthority
					state.TableHeads = TableHeads
				} else {
					console.log(AuthorityTree, '无数据', CommonAuthority, 'nnn', TableHeads)
					_self.$message.warning('权限数据不完整，返回登录页')
					_self.$router.replace('/login')
					return
				}
			}
			state.currentTableHead = state.TableHeads[module]
			//获取当前页面权限树
			let ListAuthority = state.AuthorityTree.AuthorityTreeDic[module]
			//审批权限树
			let CommonAuthority = state.CommonAuthority
			//合并权限
			let merge = state.currentAuthority = Object.assign({}, ListAuthority.UseCaseAuthority, CommonAuthority)
		},
		// 退出登录
		handleLogOut({
			commit
		}, obj) {
			obj._self.httpBack(UnLogin(), (res) => {
				return new Promise((resolve) => {
					logout().then(() => {
						commit('setToken', false)
						commit('setUserData', undefined)
						setToken()
						resolve()
					}).catch(() => {});
				})
			})
		}
	}
}
```

### 创建模拟数据
在src目录下新建api文件夹 放入fetch.js urls.js mock.js

```javascript
//api/fetch.js
let baseUrl = process.env.VUE_APP_API
const sendCnf = {
	time: 800,
	canSend: true,
	data: {},
	url: '',
}
export default async (url = '', data = {}, type = 'GET', method = 'ajax', isAttach = false) => {
	let cuo = (new Date()).getTime()
	let hUrl = getUrlString(data)
	type = type.toUpperCase();
	url = baseUrl + url;
	let boo = sendCnf.url === url
	if (hUrl && (type == 'GET' || type == 'DELETE')) {
		if (/\?/.test(url)) {
			url += '&' + hUrl
		} else {
			url += '?' + hUrl
		}
		url += '&' + 'cuo=' + cuo
	} else {
		url += '?' + 'cuo=' + cuo
	}
	url += '&Token=' + Function.$getCookie(Function.$mapping.TOKEN)
	let dd = cleanShake(sendCnf, url, data, boo)
	if (dd) return dd
	if (window.fetch && method !== 'ajax') {
		let requestConfig = {
			method: type,
			headers: {
				'Token': Function.$getCookie(Function.$mapping.TOKEN),
			},
			mode: "cors",
			cache: "force-cache"
		}
		if (method == 'json') {
			requestConfig.headers['Content-Type'] = 'application/json; charset=utf-8'
			if (type == 'POST' || type == 'PUT') {
				requestConfig.body = data
			}
		} else if (method == 'fetch') {
			requestConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
			if (type == 'POST' || type == 'PUT') {
				requestConfig.body = hUrl
			}
		}
		try {
			let response = await fetch(url, requestConfig);
			return response.json();
		} catch (error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			//获取原生ajax对象
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}
			requestObj.open(type, url, true);
			if (isAttach) {
				requestObj.setRequestHeader('content-type', 'multipart/form-data');
				requestObj.send(data);
			} else {
				if (type == 'POST') {
					requestObj.setRequestHeader('content-type', "application/x-www-form-urlencoded;charset-UTF-8");
					requestObj.send(getUrlString(data));
				} else {
					requestObj.send();
				}
			}
			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						resolve(JSON.parse(requestObj.response))
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}

function cleanShake(sendCnf, url, data, boo) {
	if (!sendCnf.canSend && boo && JSON.stringify(sendCnf.data) === JSON.stringify(data)) {
		return new Promise((resolve, reject) => reject({}))
	}
	Object.assign(sendCnf, {
		url: url.split('?')[0],
		data,
		canSend: false
	})
	setTimeout(() => {
		sendCnf.canSend = true
	}, sendCnf.time)
	return false
}

function getUrlString(data) {
	let dataArr = [];
	if (Object.keys(data).length) {
		Object.keys(data).forEach(key => {
			if (data[key] || data[key] == 0) {
				dataArr.push(key + '=' + data[key])
			}
		})
	} else {
		return ''
	}
	return dataArr.join('&')
}
```

```javascript
//api/urls.js
import fetch from './fetch'

/**
 * 登录接口
 */
export const http_login = (data) => {
	return fetch('/api/login', data, 'GET')
}
/**
 * 注册接口
 */
export const http_regedit = (data) => {
	return fetch('/api/regedit', data, 'GET')
}
/**
 * 退出登录
 */
export const UnLogin = (data) => {
	return fetch('/api/UnLogin', data, 'GET')
}
/**
 * 侧边栏列表
 */
export const GetMenuList = (data) => {
	return fetch('/api/GetMenuList', data, 'GET')
}
/**
 * 获取权限树
 */
export const GetAuthorityTree = (data) => {
	return fetch('/api/GetAuthorityTree', data, 'GET')
}
/**
 * 获取公共权限
 */
export const GetCommonAuthority = (data) => {
	return fetch('/api/GetCommonAuthority', data, 'GET')
}
/**
 * 获取所有表头
 */
export const GetTableHeads = (data) => {
	return fetch('/api/GetTableHeads', data, 'GET')
}
/**
 * 列表数据
 */
export const GetListData = (data) => {
	return fetch('/api/GetListData', data, 'GET')
}
/**
 * 列表删除
 */
export const delById = (data) => {
	return fetch('/api/delById', data, 'GET')
}
```

```javascript
//api/mock.js
const Mock = require('mockjs')
const login = Mock.mock(/\/api\/login/, {
	'message': 'ok',
	'code': 10000,
	'data': {
		'realName': '@cname',
		'age|1-100': 100,
		'color': '@color',
		'token': '@word(32)',
		'avatar': '@image("300X300")',
		'companyName': '@cword(4,6)有限公司',
		'expiryTime': '@date',
	}
});

const regedit = Mock.mock(/\/api\/regedit/, {
	'message': 'ok',
	'code': 10000,
	'data': {
		'name': '@name',
		'age|1-100': 100,
		'color': '@color'
	}
});

const GetMenuList = Mock.mock(/\/api\/GetMenuList/, {
	'message': 'ok',
	'code': 10000,
	'data|6': [{
		'ModuleId|+1': 1,
		'ModuleName': '@ctitle(4)',
		'MenuInfoModelList|1-4': [{
			'ModuleId|+1': 1,
			'ModuleName': '@ctitle(4)',
			'url': '@domain'
		}]
	}]
});

/**
 * 获取权限树
 */
const GetAuthorityTree = Mock.mock(/\/api\/GetAuthorityTree/, {
	'message': 'ok',
	'code': 10000,
	'data': {
		'list': {
			'editAuthority': true,
			'addAuthority': true,
			'deleteAuthority': true,
		}
	}
});
/**
 * 获取公共权限
 */
const GetCommonAuthority = Mock.mock(/\/api\/GetCommonAuthority/, {
	'message': 'ok',
	'code': 10000,
	'data': {
		'commonAuthority': true
	}
});
/**
 * 获取所有表头
 */
const GetTableHeads = Mock.mock(/\/api\/GetTableHeads/, {
	'message': 'ok',
	'code': 10000,
	'data': {
		'list': []
	}
});

/**
 * 列表页数据请求
 */
const GetListData = Mock.mock(/\/api\/GetListData/, {
	'message': 'ok',
	'code': 10000,
	'data|10': [{
		'filed1': "@ctitle(2)",
		'filed2': "@ctitle(2)",
		'filed3': "@ctitle(2)",
		'filed4': "@ctitle(2)",
		'filed5': '@image("300X300")',
	}]
});
```

### 创建配置文件
在src/assets/js目录下创建 cnfInput.js添加编辑页面配置 cnfTan.js弹框页面配置

```javascript
export default{}
```

```javascript
//src/assets/js/cnfInput.js
export default{
	login(second) {
		return [
			second.itemInput('用户名', [Function.$mapping.username]),
			second.itemInput('密码', [Function.$mapping.password], undefined, undefined, 'password')
		]
	},
	//登陆页面
	loginButtons(second) {
		return {
			...this.partCnf({
				is: 'el-form-item'
			}),
			data: [
				second.itemButton('立即登录', this.self.onSubmit, 'primary'),
				second.itemButton('注册账户', this.self.handleRegister),
			]
		}
	},
	test(second) {
		return [{
			pageCnf: {
				title: '管理信息',
			},
			area: [
				second.itemInput('姓名', 'name', ['required']),
				second.itemInput('学号', 'xuehao', ['required']),
				second.itemInput('性别', 'sex', ['required']),
			]
		}]
	},
}
```

### 修改路由 ——router
在根目录src/views下新建文件 index.vue login.vue home.vue
```javascript
//index.vue
<template>
	<JsFrame @click="click" :frameCnf="frameCnf">
		<JsFramePage :params="params"></JsFramePage>
	</JsFrame>
</template>

<script>
	import cnfInput from '@/assets/js/cnfInput.js'
	import {
		jiess
	} from '@/config'
	export default {
		mixins: [jiess.mixin_from_base],
		name: 'indexPage',
		data() {
			return {
				/**
				 * 框架的基础配置
				 * buttons为悬浮按钮
				 * key按钮关键字，用于区分（send rest save）
				 * class自定义按钮类名
				 * type按钮类别
				 * label按钮上的文字
				 */
				frameCnf: {
					pagetop: {
						label: 'demo页面-编辑',
						class: 'icon_search',
					},
					buttons: [{
						key: 'rest',
						label: '重置'
					}, {
						key: 'send',
						class: 'b-theme',
						type: 'primary',
						label: '保存',
					}]
				},
				paramKey: 'test',
				configSource: cnfInput,
			}
		},
		methods: {
			click(e) {
				let hideTxt = Function.$mapping.HIDE_DOM
				if (this.values.name === hideTxt) {
					this.values.name = ''
				} else {
					this.values.name = hideTxt
				}
			}
		}
	}
</script>
```

```javascript
//home.vue 
<template>
	<el-container style="height: 100%;">
		<el-header>
			<JsSysTop></JsSysTop>
		</el-header>
		<el-container>
			<!--左侧导航-->
			<JsSysLeft @menuClick="menuClick" :httpMenu="httpMenu"></JsSysLeft>
			<!--主内容区域-->
			<div id="main">
				<div id="tab-box">
					<JsSysTabs ref="tabs" id="tabs"></JsSysTabs>
					<div class="flex-hen tab-button">
						<i class="el-icon-refresh" @click="toReload"></i>
						<i class="el-icon-close" @click="closeAllTabs"></i>
					</div>
				</div>
				<div id="content" ref="content">
					<!--<keep-alive>-->
					<router-view @click.native="scollerTop" v-if="reload" />
					<!--</keep-alive>-->
				</div>
			</div>
		</el-container>

		<!-- 基础弹框 -->
		<JsTanBase :configSource="cnfTan" v-if="ishow" :tanData="tanData" v-model="ishow"></JsTanBase>
	</el-container>
</template>
<script>
	import cnfTan from '@/assets/js/cnfTan'
	import {
		mapActions
	} from 'vuex'
	import {
		GetMenuList,
	} from '@/api/urls'
	export default {
		name: "home",
		data() {
			return {
				reload: true,
				ishow: false,
				tanData: undefined,
				httpMenu: GetMenuList,
				cnfTan
			}
		},
		computed: {
			inputFocus() {
				return this.$store.state.jiess.inputFocus
			},
			fromButton() {
				return this.$store.state.jiess.fromButton
			},
			reLoad() {
				return this.$store.state.jiess.reLoad
			},
			tanHome() {
				return this.$store.state.jiess.tanHome
			},
		},
		watch: {
			/**
			 * 监听全局促发的刷新
			 */
			reLoad: {
				handler(a, b) {
					this.toReload()
				},
				deep: true
			},
			/**
			 * 监听输入框得到焦点事件
			 */
			inputFocus: {
				handler(a, b) {},
				deep: true
			},
			fromButton: {
				handler(a, b) {}
			},
			tanHome: {
				handler(a, b) {
					this.tanData = a
					this.ishow = true
				},
				deep: true
			},
		},
		mounted() {
			this.$store.state.jiess.tabsDom = this.$refs.tabs
		},
		methods: {
			...mapActions(['handleLogOut']),
			/**
			 * 刷新页面
			 */
			toReload() {
				this.reload = false
				setTimeout(() => {
					this.reload = true
				}, 10)
			},
			/**
			 * 退出登录
			 */
			handleCommand(command) {
				if (command == 'logout') {
					this.handleLogOut().then(() => {
						this.$message.success('退出登录成功')
						this.$router.push('/login')
					});
				}
			},
			/**
			 * 调到顶部
			 */
			scollerTop(e) {
				if (e.target.classList.contains('to-head-box')) {
					this.$refs.content.scrollTop = 0
				}
			},
			/**
			 * 关闭所有的tabs
			 */
			closeAllTabs() {
				this.$router.replace({
					name: Function.$mapping.CLOSE_ALL_TABS_NAME
				})
			},
			menuClick(name) {

				this.$router.push({
					name: dd[Function.$mapping.submenuChildrenData],
					params: {
						title: dd[Function.$mapping.submenuChildrenName]
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	#content {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: scroll;
	}

	#content::-webkit-scrollbar {
		display: none;
	}
</style>
```

```javascript
//login.vue 
<template>
	<div class="login">
		<el-form ref="form" :model="values" label-width="80px">
			<root v-for="(item,key) in params" :key="key" v-model="values[item.data[0].name]" :param="item"></root>
			<root @click="onSubmit" :param="buttons"></root>
		</el-form>
	</div>
</template>

<script>
	/**
	 *要做到数据和组件分离 
	 */
	import cnfInput from '../assets/js/cnfInput.js'
	import {jiess} from '@/config'
	export default {
		mixins: [jiess.mixin_from_base],
		name: 'login',
		data() {
			return {
				values: {
					[Function.$mapping.username]: '',
					[Function.$mapping.password]: '',
				},
				paramKey: 'login',
				configSource: cnfInput,
				buttons: undefined,
			}
		},
		created() {
			this.buttons = cnfInput.loginButtons.call(this.mixindo.itemSet,this.mixindo.second)
		},
		methods: {
			onSubmit(e) {
				this.$store.dispatch('handleLogin', {
					self: this,
					data: this.values
				})
			}
		}
	}
</script>
<style scoped="scoped">
	.login {
		width: 450px;
		height: 300px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
```

删除原router.js 新建文件夹router 并放入文件 index.js 和 routers.js

```javascript
//router/index.js 
import routes from './routers'
export default {
	routes,
	mode: 'hash',
	scrollBehavior: () => ({
		y: 0
	}),
}
```

```javascript
//router/routers.js
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
	}
];
```

### 引入依赖并注入配置
main.js中引入配置文件 其中的element-ui等作为关联依赖已经引入，所以直接引用即可
```javascript
//main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
// 引入样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
require('./api/mock')
Vue.config.productionTip = false

import {
    jiess
} from '@/config'
import mapping from '@/config/mapping'

Vue.use(jiess, {
    useAll: true,
    mapping,
    router,
    store,
    App,
})
```
修改App.vue
```javascript
//App.vue
<template>
	<section id="app">
		<router-view />
	</section>
</template>
<script>
	import Vue from 'vue'
	export default{
		name:'app',
	}
</script>

<style type="text/css" lang="scss">
	@import "vue-jiess-admin/assets/css/base.scss";
</style>

<style>
	body {
		box-sizing: border-box;
	}
	html,
	body {
		margin: 0;
		padding: 0;
		height: 100%;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: $black;
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		font-size: 15px;
	}
</style>
```
此时再安装依赖 npm i node-sass sass-loader mockjs -D 和 npm i js-cookie -S
### 最后一步
在public目录下创建BD.json文件，因为对于下拉框或级联选择器，默认是从BD中来获取数据，强烈建议你将不常变化的基础数据（如：性别）放入该文件，通过键名识别，以减少不必要的请求

#### 总体构建过程比较繁琐但不复杂，建议直接下载 [示例demo](https://github.com/wgzimg/vue-jiess-admin)

----

## <span id="api-quick-start">快速上手</span>
### 说明
在阅读本步骤前，确保完成了**安装**步骤；本篇通过举一个小列子来讲述具体的使用过程

#### 上代码

```html
<template>
	<!-- JsFrame和JsFramePage为内置组件 -->
	<JsFrame @click="frameButtonClick" :frameCnf="frameCnf">
		<!-- params参数由内置混合mixin_from_base根据paramKey生成 -->
		<JsFramePage :params="params"></JsFramePage>
	</JsFrame>
</template>
```
内置的混合**mixin_from_base**会通过**paramKey**生成配置，同时注入验证规则等，混合中存在**values**对象，她以表单组件的**name**值作为键名映射，组件的实时变化也会更新**values**的值，我们只需要关心如何使用该值即可
```javascript
<script>
	//自己创建的配置文件
	import cnfInput from '@/assets/js/cnfInput.js'
	//从全局的配置文件中得到vue-jiess-admin
	import {
		jiess
	} from '@/config'
	export default {
		//混入内置的操作
		mixins: [jiess.mixin_from_base],
		name: 'demoPage',
		data() {
			return {
				frameCnf: {
					//配置页面的标题和图标
					pagetop: {
						label: 'demo页面-编辑',
						class: 'icon_search',
					},
					//配置底部显示的操作按钮
					buttons: [{
						key: 'rest',
						label: '重置'
					}, {
						key: 'send',
						class: 'b-theme',
						type: 'primary',
						label: '保存',
					}]
				},
				//根据键名从数据源中获取对象
				paramKey: 'demo',
				//放入数据源
				configSource: cnfInput,
			}
		},
		methods:{
			frameButtonClick(e){
				//打印混合中的values对象
				console.log(this.values)
			}
		}
	}
</script>
```
接下来是cnfInput的内容

```javascript
//cnfInput.js
import {
	jiess
} from '@/config'
const {
	SecondEncapsulation
} = jiess

export default{
	demo() {
		//首先得到SecondEncapsulation对象
		let second = new SecondEncapsulation(this)
		return [{
			//每一块区域的小标题
			pageCnf: {
				title: 'demo模拟',
			},
			area: [
				//模拟的内容
				second.itemInput('姓名', 'name', ['required']),
				second.itemInput('学号', 'xuehao', ['required']),
				second.itemInput('性别', 'sex', ['required']),
			]
		}]
	}
}
```
关于为什么取名SecondEncapsulation，其实她就是在内置的**ItemSet**对象的**二次封装**，这样更容易理解

#### 通过以上配置便完成了一个页面，[点击查看效果页](/#/edit) 
#### 当然，您可以直接使用我们开源的demo进行修改，我们也会持续拓展demo,让您更方便快速的开发
