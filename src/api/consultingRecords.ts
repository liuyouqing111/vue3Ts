import request from '@/service/index'

interface Record {
  state: string
  name: string
  phone: string
  site: string
  email: string
  consult: string
  commuinicateName: string
  remark: string
  id: number
}
interface Search {
  endTime?: string
  name?: string
  pageNum?: number
  pageSize?: number
  startTime?: string
  state?: string
}

//编辑记录
export const editRecord = (params: Record) => {
  return request.post<any>('/consult/update', params)
}

// 删除记录
export const deleteRecord = (id: number) => {
  return request.get<any>('/consult/del', {
    params: {
      id: id
    }
  })
}

//搜索记录
export const searchRecord = (params: Search) => {
  return request.post<any>('/consult/search', params)
}
