import { MyRouteRecordRaw } from '@/router/model'
// import { RouteRecordRaw } from 'vue-router'

const mapRoutes = () => {
  const routes: MyRouteRecordRaw[] = []
  const files = import.meta.glob<true, any>('../router/home/**/*.ts', { eager: true })
  Object.keys(files).forEach((item) => {
    routes.push(files[item].default)
  })
  return routes.sort((a, b) => {
    if (a.index && b.index) return a.index - b.index
    return 1
  })
}

export default mapRoutes
