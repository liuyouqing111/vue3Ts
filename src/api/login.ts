import request from '@/service/index'

interface Ilogin {
  accountName: string
  password: string
}

//登录
export const login = (params: Ilogin) => {
  return request.post<{
    name: string
    token: string
    account: string
    roleName: string
  }>('/user/login', params)
}

export interface Imenu {
  webMenuId: number
  name: string
  child: Imenu[] | null
}

//获取菜单栏
export const getMenu = () => {
  return request.get<Imenu[]>('/user/menu')
}
