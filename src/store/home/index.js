import {reqCategoryList,reqGetBannerList} from '@/api/index'
const state = {
    categoryList:[],
    bannerList:[],
}
const mutations = {
    // 3.获取服务器返回的数据
    CATEGORYLIST(state,categoryList){
state.categoryList=categoryList.slice(0,16)//服务器里返回的数据
    },
    BANNERLIST(state,bannerList){
        state.bannerList=bannerList
    }

}
const actions = {//提交mutation 
  async categoryList({commit}){
        //2.通过api里面的接口函数调用，向服务器发请求，获取服务器数据
        let result= await reqCategoryList()//返回的是一个promise
        console.log(result);
        if(result.code==200){
            commit("CATEGORYLIST",result.data)
        }
    },
   async getBannerList({commit}){
let results=await reqGetBannerList()
if(results.code==200){
    commit("BANNERLIST",results.data)
}
    }
}
export default {
   state,

   mutations,
    actions,
}
