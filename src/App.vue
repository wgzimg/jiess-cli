//App.vue
<template>
    <section id="app">
        <router-view />
    </section>
</template>
<script>
    import Vue from 'vue'
    export default{
        name:'app',
    }
</script>

<style type="text/css" lang="scss">
    @import "vue-jiess-admin/assets/css/base.scss";
</style>

<style>
    body {
        box-sizing: border-box;
    }
    html,
    body {
        margin: 0;
        padding: 0;
        height: 100%;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: $black;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        font-size: 15px;
    }
</style>