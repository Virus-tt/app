<template>
  <div id="app">
<sell-header/>
 <router-view></router-view>
 <!-- 在Home、Search显示，在login、register隐藏 -->
<!-- <sell-footer v-show="$router.path=='/home'||$router.path=='/search' ">
</sell-footer> -->
<!-- <sell-footer  v-show="$route.path=='/home'||$route.path=='/search' "></sell-footer> -->
<!-- <sell-footer  v-show="['/home','/search'].includes($route.path) "></sell-footer> -->
 <sell-footer  v-show="$route.meta.show "></sell-footer>
</div>
</template>

<script>
import SellFooter from './components/foot/SellFooter.vue'
import SellHeader from './components/head/SellHeader.vue'
export default {
name:'',
components:{
SellHeader,
SellFooter
},
mounted(){
  //派发一个action
this.$store.dispatch("categoryList");
}
}
</script>

<style>

</style>
