import myDrawer from './src/index.vue'

export interface IdrawerConfig {
  field: string
  labelName: string
  type: 'card' | 'status' | 'images' | 'span'
  span?: 8 | 12 | 24 | 6
}

export default myDrawer
