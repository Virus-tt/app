
import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api/index'
// 封装游客身份模块uuid===生成
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodsInfo:{},
    uuid_token:getUUID()
}
const mutations = {
    GOODSINFO(state,goodsInfo){
        state.goodsInfo=goodsInfo
    }

}
const actions = {
// 获取产品信息
   async getGoodsInfo({commit},skuId){
        let result=await reqGoodsInfo(skuId)
   
        //   console.log(result,'1111111111');
        if(result.code==200){
            commit("GOODSINFO",result.data)
        }
    },
        //将产品添加到购物车中
        async addOrUpdateShopCart({ commit },{skuId,skuNum}){
            let result= await reqAddOrUpdateShopCart(skuId,skuNum)
            // console.log(result,'dusyiu');
            if(result.code==200){
                return 'ok'
               }else{
                   return Promise.reject(new Error('faile'))
           }
        }
}

const  getters={
    categoryView(state){
       return  state.goodsInfo.categoryView||{}
    },
    skuInfo(state){
        return  state.goodsInfo.skuInfo||{}
    },
    // skuImageList(state){
    //     return state.getGoodsInfo.skuInfo.skuImageList||[]
    // },
    spuSaleAttrList(state){
        return  state.goodsInfo.spuSaleAttrList||[]
    }
}
// getters是为了简化数据

export default {
    state,
    mutations,
    actions,
    getters,
}
