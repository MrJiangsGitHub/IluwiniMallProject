import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import store from '../store'
// 注册路由插件
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const routes = [
    {
        path: "/",
        redirect: "/home/index",
        component: () => import('../views/index.vue'),
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
                children: [
                    {
                        path: 'search',
                        meta: {
                            name: 'search',
                            isnabbr: true,

                        },
                        component: () => import('../views/search.vue')
                    }
                ]
            },
            {
                path: '/searchresult/:keyword',
                meta: {
                    name: 'searchresult',
                    istabbr: true //是否显示顶部栏
                },
                component: () => import('../views/searchresult.vue')
            },
            {
                path: 'shopcar',
                meta: {
                    name: 'shopcar',
                    isrights: true, //需要权限
                },
                component: () => import('../views/shopcar.vue')
            },
            {
                path: 'myuser',
                meta: {
                    name: 'myuser',
                    isnabbr: true,
                    isrights: true, //需要权限

                },
                component: () => import('../views/myuser.vue')
            },

        ]
    },
    {
        path: '/goods',
        name: 'goods',
        meta: {
            title: '商品列表'
        },
        component: () => import('../views/goods.vue')
    },
    {
        path: '/goodsDetails/:id',
        props: true,
        name: 'goodsDetails',
        meta: {
            title: '商品详情',
            istabbr: true //是否显示顶部栏
        },
        component: () => import('../views/goodsDetails.vue')
    },
    {
        path: "/login",
        name: "login",
        meta: {
            title: "登录",
            istabbr: true //是否显示顶部栏
        },
        component: () => import("../views/login.vue")
    },
    {
        path: "/addresslist",
        name: "addresslist",
        isrights: true, //需要权限
        meta: {
            title: "地址列表",
            istabbr: true //是否显示顶部栏
        },
        component: () => import("../views/addresslist.vue")
    },
    {
        path: "/puchAddress",
        name: "puchAddress",
        isrights: true, //需要权限
        meta: {
            title: "添加地址",
            istabbr: true //是否显示顶部栏
        },
        component: () => import("../views/puchAddress.vue")
    },
    {
        path: "/addressEdit/:addressform",
        name: "addressEdit",
        isrights: true, //需要权限
        meta: {
            title: "编辑地址",
            istabbr: true //是否显示顶部栏
        },
        component: () => import("../views/addressEdit.vue")
    },
    {
        path: "/orderlist/",
        name: "orderlist",
        isrights: true, //需要权限
        meta: {
            title: "订单列表",
            istabbr: true //是否显示顶部栏
        },
        component: () => import("../views/orderlist.vue")
    },
    {
        path: "/orderedit/:order_id",
        name: "orderedit",
        isrights: true, //需要权限
        meta: {
            title: "订单详情",
            istabbr: true //是否显示顶部栏
        },
        component: () => import("../views/orderedit.vue")
    },
    {
        path: "/register",
        name: "register",
        isrights: true, //需要权限
        meta: {
            title: "注册",
            istabbr: true //是否显示顶部栏
        },
        component: () => import("../views/register.vue")
    },
    
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.meta.isrights) {
        let token = store.state.token
        if (token) {
            next()
        } else {
            //重定向到跳过来的路由
            router.push('/login?redirect=' + to.fullPath)   //to.fullPath完整的路由包含参数

        }
    } else {
        // 如果用户未能验证身份，则 `next` 会被调用两次
        next()
    }

})
router.afterEach((to, from) => {
    NProgress.done();

    console.log('后守卫');
})
export default router
