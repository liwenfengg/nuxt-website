import qs from 'qs'
import { assign } from 'lodash'

export default function (app) {
  const axios = app.$axios
  // 基本配置
  axios.defaults.timeout = 10000
  axios.defaults.withCredentials = true
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  // 请求回调
  axios.onRequest(
    (config) => {
      // console.log(config)
      // 判断请求的方法 是否为 post
      if (config.method === 'post') {
        const data = assign(config.data)
        // 参数序列化
        config.data = qs.stringify(data)
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 返回回调
  axios.onResponse(
    (res) => {
      // console.log(res)
      if (res.status === 200) {
        return res
      } else {
        return Promise.reject(res)
      }
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 错误回调
  axios.onError((error) => {
    console.log(error)
  })
}
