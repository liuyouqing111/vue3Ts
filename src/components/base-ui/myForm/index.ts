import { FormItemRule } from 'element-plus'
import myForm from './src/myForm.vue'
export interface IMyform {
  formItems: IformItems[]
  layout: Ilayout
  labelWidth: number
  labelPosition: 'top' | 'left' | 'right'
  gutter?: number
}

interface IfileList {
  url: string
}
interface Irules {
  [index: string]: FormItemRule[]
}

interface ItreeProps {
  children: string
  label: string
}
interface IformItems<T = Ioptions, P = IradioOptipn> {
  field: string
  type:
    | 'input'
    | 'password'
    | 'select'
    | 'timePicker'
    | 'uploadImages'
    | 'area'
    | 'radio'
    | 'tree'
    | 'sort'
    | 'uploadImage'
    | 'textarea'
    | 'wangEditor'
    | 'inputNumber'
  labelName: string
  placeholder?: string
  options?: T[]
  startPlaceholder?: string
  endPlaceholder?: string
  rules?: FormItemRule[] | Irules
  layout?: Ilayout
  fileList?: IfileList[]
  multiple?: boolean
  disabled?: boolean
  radioOptions?: P[]
  treeDate?: any[]
  treeProps?: ItreeProps
  width?: number
  height?: number
  maxlength?: number
}
interface Ioptions {
  label: string
  value: string | number
}

interface IradioOptipn {
  label: number
  name: string
}

interface Ilayout {
  span?: number
  xl?: number
  lg?: number
  md?: number
  xs?: number
  pull?: number
  offset?: number
  push?: number
}
export default myForm
