//logo.vue 
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