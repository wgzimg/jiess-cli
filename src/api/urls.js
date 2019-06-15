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