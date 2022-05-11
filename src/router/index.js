import store from "@/store";
import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// const Home = () => import('../pages/home/Home.vue')
const Login = () => import('../pages/login/Login.vue')
const Register = () => import('../pages/register/Register.vue')
const Search = () => import('@/pages/search/Search.vue')
const Detail = () => import('@/pages/detail/Detail.vue')
const AddCartSuccess = () => import('@/pages/addCartsucc/index.vue')
const ShopCart = () => import('@/pages/ShopCart/index.vue')
const Trade = () => import('@/pages/Trade/index.vue')
const Pay = () => import('@/pages/Pay/index.vue')
const PaySuccess = () => import('@/pages/PaySuccess/index.vue')
const Center = () => import('@/pages/Center/index.vue')
const MyOrder = () => import('@/pages/Center/myOrder/index.vue')
const GroupOrder = () => import('@/pages/Center/groupOrder/index.vue')
// const Center = () => import('@/pages/Center')
// import AddCartSuccess from '@/pages/addCartsucc/index.vue'
const routes = [
    {
        path: '/',
        redirect: "home"
    },
    {
        path: '/home',
        component:  () => import('../pages/home/Home.vue'),
        meta: { isShow: true }
    }, {
        path: '/login',
        component: Login,
        meta: { isShow: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { isShow: false }
    },
    {
        // path: '/search',
        path: '/search/:keyword?',
        component: Search,
        meta: { isShow: true },
        name: "search",
        //路由组件能传递props 
        //布尔值写法
        //  props:true
        //对象写法
        //props:{a:'1',b:'2'}
        //函数写法
        props: route => {
            return {
                keyword: route.params.keyword, k: route.query.k
            }
        }
    },
    {
        path: '/detail/:skuid?',
        component: Detail,
        meta: { isShow: true },
        name: "detail",

    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { isShow: true },
        name: "addcartsuccess",
        // beforeEnter (to, from, next) {
        //     // 得到当前路由信息对象
        //     // const route = router.currentRoute  // route就是from

        //     // 得到要跳转到目路由的query参数
        //     const skuNum = to.query.skuNum
        //     // 读取保存的数据
        //     const skuInfo = JSON.parse(window.sessionStorage.getItem('SKU_INFO_KEY'))
        //     console.log('---', skuNum, skuInfo)
        //     // 只有都存在, 才放行
        //     if (skuNum && skuInfo) {
        //       next()
        //     } else { // 在组件对象创建前强制跳转到首页
        //       next('/')
        //     }
        //   }
        // beforeEnter (to, from, next) {
        //     // 得到当前路由信息对象
        //     // const route = router.currentRoute  // route就是from

        //     // 得到要跳转到目路由的query参数
        //     const skuNum = to.query.skuNum
        //     // 读取保存的数据
        //     const skuInfo = JSON.parse(window.sessionStorage.getItem('SKU_INFO_KEY'))
        //     console.log('---', skuNum, skuInfo)
        //     // 只有都存在, 才放行
        //     if (skuNum && skuInfo) {
        //       next()
        //     } else { // 在组件对象创建前强制跳转到首页
        //       next('/')
        //     }
        //   }

    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { isShow: true },
        name: "shopcart",

    },
    {
        path: '/trade',
        component: Trade,
        //路由独享守卫 只能从/shopcart到/trade
        beforeEnter (to, from, next) {
            if (from.path==='/shopcart') {
              next()
            } else {
              next('/shopcart')
            }
          },
        meta: { isShow: true },
        name: "trade",

    },
    {
        path: '/pay',
        component: Pay,
        meta: { isShow: true },
        name: "pay",
        // props: route => ({orderId: route.query.orderId}),

        /* 只能从交易界面, 才能跳转到支付界面 */
        // beforeEnter (to, from, next) {
        //   if (from.path==='/trade') {
        //     next()
        //   } else {
        //     next('/trade')
        //   }
        // }
    },
    {
        path: '/paySuccess',
        component: PaySuccess,
        meta: { isShow: true },
        name: "paySuccess",

    },
    {
        path: '/center',
        component: Center,
        meta: { isShow: true },
        children: [
            {
                path: 'myorder',//不能加斜杠
                component: MyOrder,
            },
            {
                path: 'grouporder',
                component: GroupOrder,
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },

]

//需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
    //第一个形参：路由跳转的配置对象（query|params）
    //第二个参数：undefined|箭头函数（成功的回调）
    //第三个参数:undefined|箭头函数（失败的回调）
    if (resolve && reject) {
        //push方法传递第二个参数|第三个参数（箭头函数）
        //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
        originPush.call(this, location, resolve, reject);
    } else {
        //push方法没有产地第二个参数|第三个参数
        originPush.call(
            this,
            location,
            () => { },
            () => { }
        );
    }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
            this,
            location,
            () => { },
            () => { }
        );
    }
};
let router = new VueRouter({
    routes,
    mode: 'hash',
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { y: 0 }
    }
})

router.beforeEach(async (to, from, next) => {
    //to:获取到要跳转到的路由信息
    //from：获取到从哪个路由跳转过来来的信息
    //next: next() 放行  next(path) 放行  
    //方便测试 统一放行
    //  next();
    //获取仓库中的token-----可以确定用户是登录了
    let token = store.state.user.token;
    let name = store.state.user.userinfo.name
    //用户登录了
    if (token) {
        //已经登录而且还想去登录------不行
        if (to.path == "/login" || to.path == '/register') {
            next('/');
        } else {
            //已经登陆了,访问的是非登录与注册
            //登录了且拥有用户信息放行
            if (name) {
                next();
            } else {
                //登陆了且没有用户信息
                //在路由跳转之前获取用户信息且放行
                try {
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //token失效从新登录
                    await store.dispatch('userLogOut');
                    next('/login')
                }
            }
        }
    }
    else {
        //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
        //未登录去上面这些路由-----登录
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect=' + toPath);
        } else {
            //去的不是上面这些路由（home|search|shopCart）---放行
            next();
        }

    }
});
// router.beforeEach(async (to, from, next) => {

//     let token = store.state.user.token
//     let name = store.state.user.userinfo.name
//     // console.log(token);
//     if (token) {
//         if (to.path == '/login' || to.path == '/register') {
//             next('/')
//         } else {

//             if (name) {
//                 next()
//             } else {
//                 try {
//                     await store.dispatch("getUserInfo")
//                     next()
//                 } catch (error) {
//                     try {
//                         await store.dispatch("userLogOut")
//                         next('/login')
//                     } catch (error) {
//                     }
//                 }
//             }
//         }
//     }
//     // let name=store.state.user.userinfo.name
//     // console.log(store);
// })

//全局守卫：前置守卫（在路由跳转之前进行判断）
export default router