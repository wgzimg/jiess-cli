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