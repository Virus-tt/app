import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api/index"
const state = {
    cartList: [],
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
    
};
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    async deleteCartListBySkuId({ commit },skuId){
        let result=await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //修改购物车有一个产品选中状态
    async UpdateCheckedById({commit},{skuId,isChecked}){
        let result=await reqUpdateCheckedById(skuId,isChecked)
        if (result.code == 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //删除全部勾选的
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll=[];
     getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked==1? dispatch("deleteCartListBySkuId",item.skuId):'';
      PromiseAll.push(promise);
     });
     return Promise.all(PromiseAll)
    },
    //修改全部产品的状态
    updateAllChecked({dispatch,state},isChecked){
        let promisesAll=[]
        state.cartList[0].cartInfoList.forEach(item=>{
         
          let promise=dispatch('UpdateCheckedById',{skuId:item.skuId,isChecked})
          promisesAll.push(promise);
        })
        return Promise.all(promisesAll)
// console.log(state,isChecked);
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0]||{}
    }
};
export default {
    state, mutations, actions, getters
}

