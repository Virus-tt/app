import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex);
//引入小仓库
import home from './home/index'
import search from './search/index'
import detail from "./detail/index";
import shopcart from "./shopcart";
import user from "./user";
import trade from './trade'
//对外暴露Store类的一个实例
export default new Vuex.Store({
    //s实现Vuex仓库模块式开发存储数据
    modules: {
        home, search, detail, shopcart, user,trade
    }
})