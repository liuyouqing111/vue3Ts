import request from '@/service/index'
import cache from '@/utils/cache'

//新增二级菜单

export const addSecond = (params: { menuName: string; sort: number }) => {
  return request.post<any>('/service/second/add', params)
}

//编辑二级菜单

export const editSecond = (params: { name: string; sort: number; webMenuId: number }) => {
  return request.post<any>('/service/second/update', params)
}

//删除二级菜单

export const delSecond = (id: number) => {
  return request.get<any>('/service/second/del', {
    params: {
      id
    }
  })
}

interface Ithird {
  fileId: number
  systemDetail: string
  systemIntro: string
  systemName: string
  webMenuId: number
}

//新增三级菜单

export const addThird = (params: Ithird) => {
  return request.post<any>('/service/third/add', params)
}
//删除三级菜单
export const delThird = (id: number) => {
  return request.get<any>('/service/third/del', {
    params: {
      id
    }
  })
}

//编辑三级菜单
export const editThird = (
  params: Exclude<Ithird, 'webMenuId'> & { systemId: number; mark: number }
) => {
  return request.post<any>('/service/third/update', params)
}

//上传文件
export const uploadFile = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return request.post<number>('/service/upload', formData)
}

//下载文件
export const downloadFile = (id: number) => {
  if (id) {
    return `${import.meta.env.VITE_BASE_URL}/service/down?id=${id}&hefu=${cache.getKey('token')}`
  } else {
    return ''
  }
}
