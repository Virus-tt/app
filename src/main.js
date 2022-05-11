import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/mock/mockServe'
import Pagenations from './components/pagenation/Pagenations'
// 三级联动组件---全局组件
import TypeNav from './components/typenav/TypeNav.vue'
import "swiper/css/swiper.css";
// 、、第一个参数：全局组件的名字，第二个参数：哪一个组件
//统一接口api文件里面的全部请求函数
import * as API from '@/api'
import { Button, MessageBox} from 'element-ui';
import VueLazyload from 'vue-lazyload'
import img from '@/assets/logo.png'
import myPlugins from '@/plugins/myPlugins'
import  '@/plugins/valadite'
Vue.use(myPlugins,{
  anme:'upper'
})
Vue.use(VueLazyload,{
  //懒加载默认的图
  loading:img
})
console.log(API);
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagenations.name,Pagenations)
//注册全局
Vue.component(Button.name, Button);
//挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //全局事件总线$bus
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API;
  },
  router,
  store
}).$mount('#app')
