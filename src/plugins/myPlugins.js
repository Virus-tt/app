import Vue from "vue"

let myPlugins={}
myPlugins.install=function (vue,options) {
Vue.directive(options.name,()=>{})
}
export default myPlugins