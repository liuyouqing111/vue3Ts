import type { RouteRecordRaw } from 'vue-router'
interface widthicno {
  icno?: any
  lightIcno?: any
  index?: number
}

declare type MyRouteRecordRaw = RouteRecordRaw & widthicno
