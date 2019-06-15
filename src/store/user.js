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