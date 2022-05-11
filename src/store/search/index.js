import {reqGetSearchInfo} from '@/api/index'
const state = {
    searchList:{}
}
const mutations = {
    SEARCHLIST(state,searchList){
        state.searchList=searchList
    }

}
const actions = {
   async getSearchList({commit},params={}){
        let result=await reqGetSearchInfo(params)
        // console.log(result,'1111111111');
        if(result.code==200){
            commit("SEARCHLIST",result.data)
        }
    }
}

// getters是为了简化数据
const getters={
    goodsList(state){
     return   state.searchList.goodsList||[]
    },
    trademarkList(state){
        return   state.searchList.trademarkList||[]
    },
    attrsList(state){
        return   state.searchList.attrsList||[]
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
}
