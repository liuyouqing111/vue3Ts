import { defineStore } from 'pinia'
import { Imenu } from '@/api/login'
interface ImainStore {
  name: string
  moduleList: any[]
  menuList: Imenu[]
}
export const mainStore = defineStore<'main', ImainStore>('main', {
  state() {
    return {
      name: '123',
      moduleList: [],
      menuList: []
    }
  }
})
