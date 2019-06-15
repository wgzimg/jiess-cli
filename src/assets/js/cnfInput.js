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