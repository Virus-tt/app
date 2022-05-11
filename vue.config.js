// module.export={
//     //关闭eslint
//     lintOnSave:false,
//     //代理跨域
//     devServer: {
//       // true 则热更新，false 则手动刷新，默认值为 true
//       inline: false,
//       // development server port 8000
//      // port: 8001,
//       //代理服务器解决跨域
//       proxy: {
//           //会把请求路径中的/api换为后面的代理服务器
//           //前端项目发请求的时候 路径当中有api字段 代理服务器就会找后端的服务器要数据
//           '/api': {
//               //提供数据的服务器地址
//               target: 'http://39.98.123.211',

//           }
//       },
//   }

// }
module.exports = {
    productionSourceMap:false,
    // 关闭ESLINT校验工具
    lintOnSave: false,
    //配置代理跨域
    devServer: {
      proxy: {
        "/api": {
          // target: "http://39.98.123.211",
          target:"http://gmall-h5-api.atguigu.cn"
        },
      },
    },
  };