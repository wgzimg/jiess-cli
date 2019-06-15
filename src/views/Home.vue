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