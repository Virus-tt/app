<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="carlist in cartInfoList" :key="carlist.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="carlist.isChecked == 1"
              @change="updateChecked(carlist, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="carlist.imgUrl" />
            <div class="item-msg">{{ carlist.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ carlist.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handel('minus', -1, carlist)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="carlist.skuNum"
              @change="handel('change', $event.target.value * 1, carlist)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handel('add', 1, carlist)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ carlist.skuNum * carlist.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="deleteCartById(carlist)" class="sindelet">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0" @change="updateAllChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart()">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
            <router-link class="sum-btn" to="/trade">结算</router-link>
      
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    //获取个人购物车的数据
    getData() {
      this.$store.dispatch("getCartList");
    },
    //修改某一个产品的值
    handel: throttle(async function (type, disNum, carlist) {
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          disNum = carlist.skuNum > 1 ? -1 : 0;
          //判断产品个数》1 才能传
          break;
        case "change":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - carlist.skuNum;
          }
          break;
      }
      try {
        //代表的是修改成功
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: carlist.skuId,
          skuNum: disNum,
        });
        this.getData();
      } catch (error) {}
    }, 500),
    //    async handel(type, disNum,carlist) {
    //       switch(type){
    //         case 'add': disNum=1
    //           break;
    //           case "minus":disNum=carlist.skuNum>1?-1:0
    //             //判断产品个数》1 才能传
    //           break;
    //            case 'change':
    //              if(isNaN(disNum)||disNum<1){
    //                disNum=0;
    //              } else{
    //                disNum=parseInt(disNum)-carlist.skuNum;
    //              }
    //           break;
    //       }
    // try {
    //   //代表的是修改成功
    //    await  this.$store.dispatch("addOrUpdateShopCart",{skuId:carlist.skuId,skuNum:disNum})
    //    this.getData()
    // } catch (error) {

    // }

    //     },
    //删除某个产品
    async deleteCartById(carlist) {
      try {
        //如果删除成功 再次发请求展示新的结果
        await this.$store.dispatch("deleteCartListBySkuId", carlist.skuId);

        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //修改某个产品的勾选状态
    async updateChecked(carlist, event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("UpdateCheckedById", {
          skuId: carlist.skuId,
          isChecked: isChecked,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //删除全部产品的
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch("deleteAllCheckedCart");
        this.getData();
      } catch (error) {
        alert(error.message);
      }

      // console.log(getters.cartList.cartInfoList);
    },

    //修改全部产品的状态
  async  updateAllChecked(event){
    try {
        let isChecked=event.target.checked?'1':'0'
      //怕发action
     await this.$store.dispatch('updateAllChecked',isChecked)
     this.getData();
      // console.log(isChecked);
    } catch (error) {
      alert(error.message);
    }
    
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    totalPrice() {
      // let sum= this.cartInfoList.filter(item=>{
      //     item.isChecked==1;
      //       }).reduce(temp=>{
      //        temp.skuNum*temp.skuPrice
      //       })
      //      console.log(sum);
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    isAllChecked() {
      return this.cartInfoList.every((item) => {
        item.isChecked == 1;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>