import { IMyform } from '@/components/base-ui/myForm'
import { ref } from 'vue'

interface IformValueOrigin {
  [key: string]: any
}
const usePagesrarch = (myformCongig: IMyform) => {
  const formValueOrigin: IformValueOrigin = {}
  for (const item of myformCongig.formItems) {
    if (item.type === 'uploadImages' || item.type === 'tree' || item.multiple === true) {
      formValueOrigin[item.field] = []
    } else if (item.type === 'area') {
      formValueOrigin[item.field] = {
        province: '',
        city: '',
        area: '',
        address: ''
      }
    } else if (item.type === 'sort') {
      formValueOrigin[item.field] = 1
    } else {
      formValueOrigin[item.field] = ''
    }
  }
  const formValue = ref(JSON.parse(JSON.stringify(formValueOrigin)))
  const reset = () => {
    for (const key in formValueOrigin) {
      formValue.value[`${key}`] = formValueOrigin[key]
    }
  }

  return {
    formValue,
    reset
  }
}

export default usePagesrarch
