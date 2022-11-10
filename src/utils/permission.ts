import router, { routes } from '@/router'
import cache from './cache'
import { mainStore } from '@/store/main'
import store from '@/store'
import { getMenu } from '@/api/login'
import mapRoutes from './map-routes'
import getRoutes from './getRoutes'
const main = mainStore(store)
const whiteList = ['/login', '/forget']
router.beforeEach(async (to) => {
  if (to.path === '/login') {
    main.menuList = []
    cache.removeKey('token')
    router.removeRoute('/home')
    router.addRoute(routes[2])
  }
  if (to.path === '/userInfo') {
    if (cache.getKey('token')) {
      return true
    } else {
      return '/login'
    }
  }
  if (whiteList.indexOf(to.path) === -1) {
    if (cache.getKey('token')) {
      if (main.menuList.length === 0) {
        const res = await getMenu()
        const list = mapRoutes()
        const results = getRoutes(list, res.data!)
        main.menuList = results
        for (const item of results) {
          router.addRoute('/home', item)
        }
        return to.path
      } else {
        return true
      }
    } else {
      return '/login'
    }
  } else {
    return true
  }
})
