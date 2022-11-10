import request from '@/service/index'

interface Member {
  detail: string
  position: string
  researcherName: string
  sort: number
  researchId: number
}

//新增成员
export const addMember = (params: Omit<Member, 'id'>) => {
  return request.post<any>('/team/add', params)
}

// 编辑成员
export const editMember = (params: Member) => {
  return request.post<any>('/team/update', params)
}

// 删除成员
export const deleteMember = (id: number) => {
  return request.get<any>('/team/del', {
    params: {
      id: id
    }
  })
}
