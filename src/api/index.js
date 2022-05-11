 import requests from "./request"
 import mockRequests from "./mockAjax";
//export const reqCategoryList = () =>requests.get(`/product/getBaseCategoryList`);
// //三级联动的接口\
// // /api/product/getBaseCategoryList  get 无参数
// // http://39.98.123.211
 export const reqCategoryList = () =>
     requests({ url: '/product/getBaseCategoryList', method: 'get' });
// // // requests.get(`/product/getBaseCategoryList`);
//当前模块，API进行统一管理，即对请求接口统一管理

//切记:当前函数执行需要把服务器返回结果返回
//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner')
// 获取搜索商品接口 地址/api/list post  需要带参数
// {
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
//   }
//当前这个接口给服务器传递参数params,至少
 export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post',data:params });

//  获取产品详情信息的接口/api/item/{ skuId }  get
export const reqGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:'get'})
//将产品添加到购物车
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
export const reqCartList=()=>requests({url:`/cart/cartList`,method:'get'})
//删除购物车的
// export const reqDeleteCarById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:"delete"})
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});
//修改商品的选中状态
export const reqUpdateCheckedById=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
//获取验证码，url：/api/user/passport/sendCode/{phone} get

export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册/api/user/passport/register  phone password code method POST
export const reqUserRegister=(data)=>requests({url:`/user/passport/register`,data,method:'post'})
//登录 /api/user/passport/login  method POST phone password
export const reqUserLogin=(data)=>requests({url:`/user/passport/login`,data,method:'post'})
// 修改的：
// 添加了token校验获取用户登录信息，用户登录只保存用户的token
// token校验
// http://182.92.128.115/api/user/passport/auth/getUserInfo
export const reqGetUserInfo=(params)=>requests({url:`/user/passport/auth/getUserInfo`,params,method:'get'})
//获取用户地址信息 /api/user/userAddress/auth/findUserAddressList  get
//推出登录  /api/user/passport/logout get
export const reqLoginOut=()=>requests({url:`/user/passport/logout`,method:'get'})
// /api/user/userAddress/auth/findUserAddressList       get
//获取用户地址信息
export const reqUserAddress=()=>requests({url:`/user/userAddress/auth/findUserAddressList`,method:'get'})
//获取商品清单 /api/order/auth/trade
export const reqOrderInfo=()=>requests({url:`/order/auth/trade`,method:'get'})
//提交订单的接口
// /api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
//支付 /api/payment/weixin/createNative/{orderId}  get 参数 orderId
export const reqPay=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId} `,method:'get'})
//获取支付订单状态 /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId} `,method:'get'})

// 获取个人中心数据 /api/order/auth/{page}/{limit} get
export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})