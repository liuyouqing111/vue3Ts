import request from '@/service/index'
import cache from '@/utils/cache'
export interface IcompanyProfile {
  fileId: number | string
  vision: string
  overview: string
  detail: string
}
//上传文件
export const uploadFile = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return request.post<number>('/about/upload', formData)
}

//下载文件
export const downloadFile = (id: number) => {
  if (id) {
    return `${import.meta.env.VITE_BASE_URL}/about/down?id=${id}&hefu=${cache.getKey('token')}`
  } else {
    return ''
  }
}

//查看公司介绍
export const companyProfile = () => {
  return request.get<IcompanyProfile>('/about/company')
}

export const editCompanyProfile = (params: IcompanyProfile) => {
  return request.post<any>('/about/update/company', params)
}

//查看联系我们

export const concatUs = () => {
  return request.get<any>('/about/relationList')
}
//编辑联系我们

export const editConcatus = (params: any) => {
  return request.post<any>('/about/updateRelation', params)
}

interface Ison {
  detailIntro: string
  fileId: number
  name: string
  site: string
}

//新增子公司

export const addSon = (params: Ison) => {
  return request.post<any>('/about/son/add', params)
}

//编辑子公司
export const editSon = (params: Ison & { id: number }) => {
  return request.post<any>('/about/son/update', params)
}

//删除子公司
export const deleteSon = (mark: number) => {
  return request.get<any>('/about/son/del', {
    params: {
      mark
    }
  })
}
