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