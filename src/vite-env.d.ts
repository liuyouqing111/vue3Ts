/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'element-china-area-data'

declare module '@wangeditor/editor-for-vue'
declare module 'diff'
