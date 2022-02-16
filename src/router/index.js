import Vue from "vue";
import  VueRouter from 'vue-router'
Vue.use(VueRouter)
const Home=()=>import('../pages/home/Home.vue')
const Login=()=>import('../pages/login/Login.vue')
const Register=()=>import('../pages/register/Register.vue')
 const Search=()=>import('@/pages/search/Search.vue')
const routes=[
    {
        path: '/',
       redirect:"home"
    },
    {
        path: '/home',
        component: Home,
        meta:{show:true}
    },{
        path: '/login',
         component: Login,
         meta:{show:false}
    },
    {
        path: '/register',
         component: Register,
         meta:{show:false}
    },
    {
        // path: '/search',
        path: '/search/:keyword?',
         component: Search,
         meta:{show:true},
         name:"search",
         //路由组件能不能传递props
         //布尔值写法
        //  props:true
        //对象写法
        //props:{a:'1',b:'2'}
        //函数写法
        props:($route)=>{
return{
keyword:$route.params.keyword,k:$route.query.k
}
        }
    }
]
const router=new  VueRouter({
    routes,
    mode:'history'
})
export default router