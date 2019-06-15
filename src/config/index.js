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