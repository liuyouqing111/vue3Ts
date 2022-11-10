const getRoutes = (allList: any[], list: any[]) => {
  const newArr: any[] = []
  const perms: string[] = []
  function getList(list: any[]) {
    list.forEach((item) => {
      perms.push(item.name)
      if (item.child) {
        getList(item.child)
      }
    })
  }
  getList(list)
  allList.forEach((item) => {
    if (perms.includes(item?.meta?.name) || item.name === '个人中心') {
      if (item.children.length > 0) {
        const newArr: any[] = []
        item.children.forEach((citem: any) => {
          if (citem.meta && perms.includes(citem.meta.name)) {
            newArr.push(citem)
          } else {
            newArr.push(citem)
          }
        })
        item.children = newArr
      }
      newArr.push(item)
    }
  })
  return newArr
}

export default getRoutes
