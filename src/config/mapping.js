//mapping.js 
//字段的映射关系或常量
export default {
    TOKEN: 'Token',
    //隐藏组件的唯一常量，定义好后不要更改
    HIDE_DOM: '***隐藏***',
    USER_DATA: 'userData',
    HOME_PAGE_NAME: 'home',
    LOGIN_PAGE_NAME: 'login',
    REGISTER_PAGE_NAME: 'register',
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