import {reqUserAddress,reqOrderInfo} from '@/api/index'
const state={
    address:[],
    orderInfo:{}
}
const mutations={
    GETUSERADDRESS(state,address){
        state.address=address
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo=orderInfo
    }
}
const actions={
    //获取用户地址
  async  getUserAddres({commit}){
      let result=await reqUserAddress()
      if(result.code==200){
        commit("GETUSERADDRESS",result.data)
      }
      
      console.log(result);
    },
    //获取商品清单
    async getOrderInfo({commit}){
        let result=await reqOrderInfo()
        if(result.code==200){
            commit("GETORDERINFO",result.data)
            console.log(result);
        }

    }
}

const getters={}
export default {
    state, mutations, actions, getters
}