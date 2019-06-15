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