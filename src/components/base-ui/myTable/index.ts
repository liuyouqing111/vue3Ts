import { CSSProperties } from 'vue'
import myTable from './src/index.vue'

export const rowStyle: CSSProperties = {
  height: '56px'
}

export const headerCellStyle: CSSProperties = {
  background: '#f7f8fb',
  height: '56px',
  fontSize: '16px',
  color: '#333',
  fontWeight: 600
}

interface Filter {
  text: string
  value: string
}
export interface Idataconfig {
  prop?: string
  label?: string
  width?: number
  slotName?: string
  type?: string
  fixed?: number
  filters?: Filter[]
  filterMethod?: Function
}
export default myTable
