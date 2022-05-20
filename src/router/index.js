import Vue from 'vue'
import VueRouter from 'vue-router'


// 注册路由插件
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: "/home/index",
    },
    {
        path: '/home',
        component: () => import('../views/index.vue'),
        children: [
            {
                path: 'index',
                meta: {
                    name: 'home',
                    isnabbr: true
                },
                component: () => import('../views/home.vue'),
            },
            {
                path: 'shopcar',
                meta: {
                    name: 'shopcar',
                    isnabbr: true
                },
                component: () => import('../views/shopcar.vue')
            },
            {
                path: 'myuser',
                meta: {
                    name: 'myuser',
                    isnabbr: true

                },
                component: () => import('../views/myuser.vue')
            }
        ]
    },
    {
        path: '/goods',
        meta: {
            title: '商品列表'
        },
        component: () => import('../views/goods.vue')
    },
    {
        path: '/goodsDetails/:id',
        props:true,
        meta: {
            title: '商品详情'
        },
        component: () => import('../views/goodsDetails.vue')
    }

]

const router = new VueRouter({
    routes
})

export default router
