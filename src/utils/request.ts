import axios from 'axios'
import { router } from '@/router'
import { message } from 'ant-design-vue'
import { useToken } from '@/hooks';

const prefixUrl = (import.meta.env.VITE_BASE_API as string)
// 请求列表(防重复提交)
const requestList: string[] = [];
const CancelToken = axios.CancelToken;
const source = CancelToken.source()

const service = axios.create({
  baseURL: prefixUrl,
  timeout: 180 * 1000
})

// 异常处理
const handleError = (error: string): Promise<string> => {
  console.log('错误信息:', error)
  message.error({ content: error || '服务器错误!', key: 'error' })
  return Promise.reject(error)
}

// 请求拦截
service.interceptors.request.use(
  (config) => {
    if (config?.headers) config.headers['Authorization'] = `Bearer ${useToken()}`

    // 防止重复提交（如果本次是重复操作，则取消，否则将该操作标记到requestList中）
    const requestFlag = JSON.stringify(config.url) + JSON.stringify(config.data) + '&' + config.method;
    if (requestList.includes(requestFlag)) { // 请求标记已经存在，则取消本次请求，否则在请求列表中加入请求标记
      source.cancel();//取消本次请求
    } else {
      requestList.push(requestFlag);
    }

    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 请求返回后，将请求标记从requestList中移除
    const requestFlag = JSON.stringify(response.config.url) + JSON.stringify(response.config.data) + '&' + response.config.method;
    const index = requestList.findIndex(item => item === requestFlag)
    requestList.splice(index, 1);

    // 权限不足
    if (res?.code === 601) {
      handleError(res.message)
      router.push('/login')

      // return Promise.reject(new Error(res.message || 'Error'))
      return res
    }

    // 错误处理
    if (res?.code !== 200) {
      handleError(res.message)
    }

    return res
  },
  (error) => {
    //置空请求列表
    requestList.length = 0;
    return Promise.reject(error)
  }
)

export default service