import axios from 'axios'
import { message } from 'antd'

const defaultAxiosConf = {
  timeout: 5000
}

const _request = (params = {}, fn = () => {}) => {
  return axios({ ...defaultAxiosConf, ...params })
    .then(res => {
      const { success, data, err, code } = res.data

      if (code === 401) {
        window.location.href = '/'

        return
      }

      if (success) {
        fn(false)
        console.log('没有错!!!')
        console.log(data)
        return res.data.movieList
      }

      throw err
    })
    .catch((err) => {
      fn(false)
      console.log(err)
      console.log('报错!!!')
      message.err(String(err || '网络错误'))
      return '123'
    })

}

export default (param) => {
  const type = typeof param

  console.log('这时的type是:', type )
  if (type === 'function') {
    param(true)
    return (obj) => _request(obj, param)
  }

  if (type === 'object' && type !== null) {
    return _request(param)
  }
}