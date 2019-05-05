import Axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // token 不需要可以不要

const baseUrl = process.env.BASE_URL

const httpServer = (opts: any) => {
  const defaultOpts = { // http默认配置
    method: opts.method,
    baseURL: baseUrl,  // 测试
    url: opts.url,
    timeout: 100000,
    params: opts.params,
    data: opts.params,
    headers: opts.method === 'get' ? {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      'sysToken': ''
    } : {
        'Content-Type': 'application/json; charset=UTF-8',
        'sysToken': ''
      }
  }
  if (getToken()) {
    const token: any = getToken()
    defaultOpts.headers.sysToken = token
  }
  if (opts.method === 'get') {
    delete defaultOpts.data
  } else {
    delete defaultOpts.params
  }
  const promise = new Promise ((resolve: any, reject: any) => {
    Axios(defaultOpts).then(
      (res: any) => {
        // 请求数据成功 
        if (res.data.code === 0) {
          resolve(res.data)
        } else {
          Message({
            message: res.data.msg,
            type: 'error',
            duration: 2,
            onClose: () => {
              reject(res.data)
            }
          })
        }
      }
    ).catch(
      (error: any) => {
        reject(error)
      }
    )
  })
  return promise
}

export default httpServer;
