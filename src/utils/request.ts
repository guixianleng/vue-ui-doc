// import axios from 'axios'
// import router from '../router'
// import { Message, Loading } from 'element-ui'
// import { getToken, removeToken } from '@/utils/auth' // token 不需要可以不要


// const service = axios.create({
//   // 设置超时时间
//   timeout: 60000,
//   baseURL: process.env.BASE_URL
// })

// /**
//  * 请求前拦截
//  * 用于处理需要在请求前的操作
//  */
// let loading: any = null

// service.interceptors.request.use((config: any) => {
//   const token: any = getToken()
//   if (token) {
//     config.headers.Authorization = token
//   }
//   // 在请求先展示加载框
//   loading = Loading.service({
//     text: '正在加载中......'
//   })
//   return config
// }, (error) => {
//   return Promise.reject(error)
// })

// /**
//  * 请求响应拦截
//  * 用于处理需要在请求返回后的操作
//  */

// service.interceptors.response.use((response: any) => {
//   // 请求响应后关闭加载框
//   if (loading) {
//     loading.close()
//   } 
//   const responseCode = response.status
//   if (responseCode === 200) {
//     return Promise.resolve(response)
//   } else {
//     return Promise.reject(response)
//   }
// }, (error: any) => {
//   // 请求响应后关闭加载框
//   if (loading) {
//     loading.close()
//   }
//   // 断网 或者 请求超时 状态
//   if (!error.response) {
//     // 请求超时状态
//     if (error.message.includes('timeout')) {
//       console.log('超时了')
//       Message.error('请求超时，请检查网络是否连接正常')
//     } else {
//       // 可以展示断网组件
//       console.log('断网了')
//       Message.error('请求失败，请检查网络是否已连接')
//     }
//     return
//   }
//   // 可以根据后端返回的状态码进行不同的操作
//   const responseCode = error.response.status
//   switch (responseCode) {
//     // 401：未登录
//     case 401:
//       // 跳转登录页
//       router.replace({
//         path: '/login',
//         query: {
//           redirect: router.currentRoute.fullPath
//         }
//       })
//       break
//     // 403: token过期
//     case 403:
//       // 弹出错误信息
//       Message({
//         type: 'error',
//         message: '登录信息过期，请重新登录'
//       })
//       // 清除token
//       removeToken()
//       // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
//       setTimeout(() => {
//         router.replace({
//           path: '/login',
//           query: {
//             redirect: router.currentRoute.fullPath
//           }
//         })
//       }, 1000)
//       break
//     // 404请求不存在
//     case 404:
//       Message({
//         message: '网络请求不存在',
//         type: 'error'
//       })
//       break
//     // 其他错误，直接抛出错误提示
//     default:
//       Message({
//         message: error.response.data.message,
//         type: 'error'
//       })
//   }
//   return Promise.reject(error)
// })

// export default service
