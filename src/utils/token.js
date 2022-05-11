//存储token
export const setToken=(token)=>{
    localStorage.setItem("TOKEN",token)
}
//暴露token
export const getToken=()=>{
    localStorage.getItem("TOKEN")
}
// 清楚token
export const removeToken=()=>{
    localStorage.removeItem("TOKEN")
}