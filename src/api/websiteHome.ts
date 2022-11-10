import request from '@/service/index'
interface Isite {
  id: number
  latitude: number
  longitude: number
  site: string
}

export interface Iinvest {
  investAmount: number
  investCompany: number
  empSum: number
}
//删除分布点
export const deleteSite = (id: number) => {
  return request.get<any>('/home/site/del', {
    params: {
      id: id
    }
  })
}
//新增分布点
export const addSite = (params: Omit<Isite, 'id'>) => {
  return request.post<any>('/home/site/add', params)
}
//编辑分布点
export const editSite = (params: Isite) => {
  return request.post<any>('/home/site/update', params)
}

//查看投资

export const seeInvest = () => {
  return request.get<Iinvest>('/home/invset/get')
}

export const editInvest = (params: Iinvest) => {
  return request.post<any>('/home/invset/update', params)
}
