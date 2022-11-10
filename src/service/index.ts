import MyRequest from './request/index'
import cache from '@/utils/cache'
export default new MyRequest({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  // timeout: 3000,
  // showLoading: true,
  interceptors: {
    requestInterceptor(config) {
      const token = cache.getKey('token')
      // const token = 'sea:sysUser:b1b6813ac1c94f87aa47722b0dfde4d9'
      if (token) {
        config.headers!.hefu = token
      }
      return config
    },
    requestInterceptorCatch(err) {
      return err
    },
    responseInterceptor(res) {
      return res
    },
    responseInterceptorCatch(err) {
      return err
    }
  }
})
