import request from '@/service/index'
import cache from '@/utils/cache'

//上传文件
export const uploadFile = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return request.post<number>('/insight/upload', formData)
}

//下载文件
export const downloadFile = (id: number) => {
  if (id) {
    return `${import.meta.env.VITE_BASE_URL}/insight/down?id=${id}&hefu=${cache.getKey('token')}`
  } else {
    return ''
  }
}

interface Isecond {
  name: string
  sort: number
  webMenuId: number
}

//新增二级菜单
export const addSecond = (params: { menuName: string; sort: number }) => {
  return request.post('/insight/second/add', params)
}

//编辑二级菜单
export const editSecond = (params: Isecond) => {
  return request.post('/insight/second/update', params)
}

//删除二级菜单
export const delSecond = (id: number) => {
  return request.get('/insight/second/del', {
    params: {
      id
    }
  })
}

interface Ithird {
  fileId: number
  intro: string
  newsDetail: string
  newsName: string
  publishTime: string
  webMenuId: number
}

//新增三级菜单
export const addThird = (params: Ithird) => {
  return request.post('/insight/third/add', params)
}

//删除三级菜单
export const delThird = (id: number) => {
  return request.get('/insight/third/del', {
    params: {
      id
    }
  })
}

//编辑三级菜单
export const editThird = (
  params: Exclude<Ithird, 'webMenuId'> & { mark: number; newsId: number }
) => {
  return request.post('/insight/third/update', params)
}
