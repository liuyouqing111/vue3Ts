import request from '@/service/index'

interface Ipwd {
  newPwd: string
  oldPwd: string
  surePwd: string
}

//编辑账号
export const editName = (name: string) => {
  return request.get('/people/updateAccount', {
    params: {
      name
    }
  })
}

//修改密码
export const updatePwd = (params: Ipwd) => {
  return request.post('/people/updatePwd', params)
}
