<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要引入 -->
    <type-nav />
    <list-container />
    <recommend />
    <rank />
    <like />
    <floor/>
    <brand/>
    
  </div>
</template>

<script>
import Brand from './brand/Brand.vue';
import Floor from './floor/Floor.vue';
import Like from "./like/Like.vue";
import ListContainer from "./listcontainer/ListContainer.vue";
import Rank from "./rank/Rank.vue";
import Recommend from "./recommend/Recommend.vue";
import TypeNav from "@/components/typenav/TypeNav.vue"

export default {
  components: { TypeNav, ListContainer, Recommend, Rank, Like, Floor, Brand },
mounted(){
  //获取用户信息在首页展示
   this.$store.dispatch("getUserInfo")
}
  
};
</script>

<style>
</style>

