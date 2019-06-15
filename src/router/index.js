//index.js 
import routes from './routers'
export default {
    routes,
    mode: 'hash',
    scrollBehavior: () => ({
        y: 0
    }),
}