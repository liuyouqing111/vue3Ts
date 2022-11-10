import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface MYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch: (err: any) => any
  responseInterceptor: (res: T) => T
  responseInterceptorCatch: (err: any) => any
}

export interface MYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: Partial<MYRequestInterceptors<T>>
  showLoading?: boolean
}
