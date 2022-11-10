import request from '@/service/index'
import cache from '@/utils/cache'

interface IModule {
  webMenuId: number
  name: string
  son?: boolean
}

export interface Ilist {
  id: number
  webMenuId: number | string
  fileId: number
  url: string | null
  sort: number
}

//上传文件
export const uploadFile = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return request.post<number>('/banner/upload', formData)
}

//下载文件
export const downloadFile = (id: number) => {
  if (id) {
    return `${import.meta.env.VITE_BASE_URL}/banner/down?id=${id}&hefu=${cache.getKey('token')}`
  } else {
    return ''
  }
}
//首页模块

//获取以及菜单信息

export const getMenu = () => {
  return request.post<IModule[]>('/user/menu', {})
}

//列表

export const getMainList = (id: number) => {
  return request.get<Ilist[]>('/banner/getHomeBanner', {
    params: {
      id
    }
  })
}

//新增

export const addHomebanner = (params: Omit<Ilist, 'id'>) => {
  return request.post<any>('/banner/addHomeBanner', params)
}

//编辑
export const editHomebanner = (params: Ilist) => {
  return request.post<any>('/banner/updateHomeBanner', params)
}

//删除
export const delHomebanner = (id: number) => {
  return request.get('/banner/delHomeBanner', {
    params: {
      id
    }
  })
}

//其他模块

//获取模块下拉

export const getModules = () => {
  return request.get<IModule[]>('/banner/get')
}

export const getOtherList = () => {
  return request.get<Ilist[]>('/banner/getOtherBanner')
}

//新增其他
export const addOtherbanner = (params: Omit<Ilist, 'id'>) => {
  return request.post<any>('/banner/addOtherBanner', params)
}

//编辑其他模块
export const editOtherbanner = (params: Ilist) => {
  return request.post<any>('/banner/updateOtherBanner', params)
}

//删除其他模块

export const deleteOtherBanner = (id: number) => {
  return request.get<any>('/banner/delOtherBanner', {
    params: {
      id
    }
  })
}
