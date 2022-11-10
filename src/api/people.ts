import request from '@/service/index'
import qs from 'qs'
//账号模块

interface Iuser {
  accountName: string
  roleId: number
  username: string
}

//获取角色下拉框
export const getSelect = () => {
  return request.get<any[]>('/people/rolelist')
}

//新增账号
export const addUser = (params: Iuser) => {
  return request.post('/people/add', params)
}

//编辑账号

export const editUser = (params: Iuser & { userId: number }) => {
  return request.post('/people/update', params)
}

//删除账号
export const delUser = (id: number) => {
  return request.get('/people/del', {
    params: {
      id
    }
  })
}

interface Irole {
  perms: string
  roleName: string
}
//获取权限列表

export const getRole = () => {
  return request.get<any[]>('/people/role/authority')
}

//新建角色

export const addRole = (params: Irole) => {
  return request.post('/people/role/add', params)
}

//编辑角色
export const editRole = (params: Irole & { roleId: number }) => {
  return request.post('/people/role/update', params)
}

//删除角色

export const delRole = (id: number) => {
  return request.get('/people/role/del', {
    params: {
      id
    }
  })
}

//批量删除账号
export const delUsers = (ids: number[]) => {
  return request.get('/people/del/batch', {
    params: {
      ids
    },
    paramsSerializer(params) {
      return qs.stringify(params, { indices: false })
    }
  })
}

//批量删除角色
export const delRoles = (ids: number[]) => {
  return request.get('/people/roles/del', {
    params: {
      ids
    },
    paramsSerializer(params) {
      return qs.stringify(params, { indices: false })
    }
  })
}
