<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveStyle" @mouseenter="showType">
        <h2 class="all">全部商品分类</h2>
         <!-- 过渡动画 -->
          <transition name='sort'>
               <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item bo"
              v-for="(c1, index) in categoryLists"
              :key="c1.categoryId"
            >
              <h3
                :class="{ cur: currentIndex == index }"
                @mouseenter="changeStyle(index)"
              >
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                >
                  {{ c1.categoryName }}</a
                >
              </h3>
              <!-- <router-link to="/search">  {{ c1.categoryName }}</router-link> -->

              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                      >
                        {{ c2.categoryName }}</a
                      >

                      <!-- <router-link to="/search">  {{ c2.categoryName }}</router-link> -->
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}
                        </a>
                      </em>
                      <!-- <router-link to="/search">  {{ c3.categoryName }}</router-link> -->
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          .
        </div>
          </transition>
     
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";//辅助函数 组件获取仓库中的数据
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show:true
    };
  },
  //组件挂在完毕：可以向服务器发请求 获取服务器的数据 展示数据
  mounted() {
    //1.通知Vuex发请求，获取数据，存储于仓库之中 
    // this.$store.dispatch("categoryList");  找到相应的仓库书写相应的action
    //如果不是Home路由组件 将typenav进行隐藏
    if(this.$route.path!='/home'){
      this.show=false
    }
  },
  computed: {
    ...mapState({
      categoryLists: (state) => {
        return state.home.categoryList;
      },
    }),
    ///...mapState("home", ["categoryList"]),
  },

  methods: {
    changeStyle: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    leaveStyle() {
      this.currentIndex = -1;
      if(this.$route.path!='/home'){
          this.show=false
      }
    
    },
    goSearch(event) {
      let element = event.target;
      console.log(element.dataset);
      let {
        categoryname, //判断是不是a标签
        category1id, //判断是不是一级标签
        category2id, // 判断是不是二级标签
        category3id, //判断是不是三级标签
      } = element.dataset;
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //判断：如果路由跳转的时候，带有params参数，也要传递过去
        if (this.$route.params) {
          location.params=this.$route.params
           location.query = query;
        //路由跳转
        this.$router.push(location);
          }
        //整理完参数
       
      }
      // console.log(element.dataset);
    },
    showType(){
      if(this.$route.path!='/home'){
          this.show=true
      }
    }
  },
};
</script>

<style scoped lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
            &.cur {
              background: skyblue;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          // .cur {
          //   background-color: pink;
          // }
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
    //过渡动画的样式:前提 元素必须要有v-show、v-if
    // 过渡动画开始状态
    .sort-enter{
      height: 0px;
    }
     // 过渡动画开始状态
     .sort-entet-to{
       height: 461px;
     }
    //  定义动画的时间、速率
    .sort-enter-active{
      transition: all .4s linear;
    }
  }
}
</style>