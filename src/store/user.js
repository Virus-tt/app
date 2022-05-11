import { reqGetCode, reqUserRegister, reqUserLogin,reqGetUserInfo,reqLoginOut } from '@/api/index'
import {setToken,getToken,removeToken} from '@/utils/token'
//登录与注册的模块
const state = {
    code: '',
    token:getToken(),
    // token:localStorage.getItem('TOKEN'),
    userinfo:{}
};
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    USERINFO(state,userinfo){
        state.userinfo=userinfo
    },
    CLEAR(state){
        //帮仓库相关数据清空
        state.token='',
        state.userinfo={}
        // 本地存储的数据清空
        removeToken()
    }
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit("GETCODE", result.data)
            // console.log(result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        // console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户登录
    async userLogin({ commit }, users) {
        let result = await reqUserLogin(users)
        console.log(result);
        //服务器下发的token，用户唯一标识符（uuid）
        //将来经常通过带token找服务器要用户信息进行展示
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token)
            setToken(result.data.token)
            return 'ok'
        } else{
            return Promise.reject(new Error('faile'))
        }
   
    },
    //获取用户信息
  async  getUserInfo({ commit }){
      let result= await reqGetUserInfo()
      if (result.code == 200) {
        commit("USERINFO", result.data)
        setToken(result.data.token)
        // localStorage.setItem("TOKEN",result.data.token)
        console.log(result);
        return 'ok'
    } else{
        return Promise.reject(new Error('faile'))
    }
     
    },
  async userLogOut({commit}){
      //只是向服务器发起一次请求,通知服务器清楚token
     let result=   await reqLoginOut()
    //  console.log(result);
     //action里面不能操作state 提交mutation来修改state
     if(result.code == 200){
commit("CLEAR")
return 'ok'
     }else{
        return Promise.reject(new Error('faile'))
     }
    
    }

};
const getters = {};

export default {
    state, mutations, actions, getters
}