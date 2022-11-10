import { IMyform } from '@/components/base-ui/myForm'

const useChangeType = (obj: any, formConfig: IMyform) => {
  for (const item of formConfig.formItems) {
    if (item.type === 'inputNumber') {
      obj[item.field] = +obj[item.field]
    }
  }
}

export default useChangeType
