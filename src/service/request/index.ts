import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { MYRequestInterceptors, MYRequestConfig } from './type'
import { ElLoading, ElMessage } from 'element-plus'
import 'element-plus/es/components/loading/style/css'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

class MyRequest {
  instance: AxiosInstance
  interceptors?: Partial<MYRequestInterceptors>
  loading?: LoadingInstance
  showLoading: boolean
  constructor(config: MYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? false
    //所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: false,
            text: '正在努力加载中...',
            background: 'rgba(0,0,0,0.5)'
          })
        }

        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        return res.data
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
    //对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }

  //请求方法
  request<T>(config: MYRequestConfig<DataType<T>>): Promise<DataType<T>> {
    return new Promise((resolve, reject) => {
      if (config.showLoading) {
        this.showLoading = config.showLoading
      }
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      this.instance
        .request<any, DataType<T>>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          if (res.code === 200) {
            resolve(res)
            if (res.message.indexOf('操作') !== -1) {
              ElMessage({
                message: res.message,
                type: 'success'
              })
            }
          } else {
            ElMessage({
              message: res.message,
              type: 'error'
            })
          }
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }
  get<T>(url: string, config?: MYRequestConfig<DataType<T>>): Promise<DataType<T>> {
    return this.request<T>({
      url: url,
      ...config,
      method: 'get'
    })
  }
  post<T, D = any>(
    url: string,
    data: D,
    config?: MYRequestConfig<DataType<T>>
  ): Promise<DataType<T>> {
    return this.request<T>({
      url: url,
      data: data,
      ...config,
      method: 'post'
    })
  }
  delete<T>(url: string, config?: MYRequestConfig<DataType<T>>): Promise<DataType<T>> {
    return this.request<T>({
      url: url,
      ...config,
      method: 'delete'
    })
  }
  patch<T>(url: string, config?: MYRequestConfig<DataType<T>>): Promise<DataType<T>> {
    return this.request<T>({
      url: url,
      ...config,
      method: 'patch'
    })
  }
}

export default MyRequest
