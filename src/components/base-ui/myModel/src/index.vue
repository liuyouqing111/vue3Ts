<template>
  <div class="my-model">
    <el-dialog
      v-model="dialogVisible"
      :title="title || '标题'"
      width="520px"
      destroy-on-close
      @closed="reset"
    >
      <div class="form specialThumb">
        <MyForm
          v-model="formValue"
          ref="myformRef"
          :myform-congig="myformCongig"
          @success="confirmSuccess"
        />
      </div>
      <template #footer>
        <div class="dialog-footer flex-start">
          <div class="cancel-btn" @click="dialogVisible = false">取消</div>
          <div class="confirm-btn" @click="confirm">确认</div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { IMyform } from '../../myForm'
import MyForm from '../../myForm'
import { ref, watch } from 'vue'

import usePagesrarch from '@/hooks/usePagesearch'

const myformRef = ref<InstanceType<typeof MyForm>>()

const props = defineProps<{
  myformCongig: IMyform
  defaultInfo: any
  title?: string
}>()
const dialogVisible = ref(false)
const emit = defineEmits<{
  (event: 'confirm', value: any): void
}>()
const { formValue, reset } = usePagesrarch(props.myformCongig)
watch(
  () => {
    return props.defaultInfo
  },
  (newvalue) => {
    for (let key in formValue.value) {
      formValue.value[key] =
        newvalue[key] || newvalue[key] === 0 ? newvalue[key] : formValue.value[key]
    }
  },
  {
    deep: true
  }
)
const show = () => {
  dialogVisible.value = true
}

const close = () => {
  dialogVisible.value = false
}
const confirm = () => {
  myformRef.value?.submitForm()
}

const confirmSuccess = () => {
  emit('confirm', formValue.value)
}
defineExpose({
  show,
  close
})
</script>

<style scoped lang="less">
.my-model {
  .form {
    padding: 0 60px !important;
    max-height: 400px;
    min-height: 400px;
    overflow-y: auto;
  }
  ::v-deep(.el-dialog) {
    .el-dialog__header {
      border-bottom: 1px solid #e4e4e4;
      margin-right: 0px !important;
      height: 64px;
    }
    .el-dialog__footer {
      height: 88px;
      padding: 0 !important;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: 1px solid #e4e4e4;
      .dialog-footer {
        .confirm-btn {
          margin-left: 16px;
        }
      }
    }
    // .el-dialog__body {
    //   max-height: 200px;
    //   overflow-y: overlay;
    // }
  }
}
</style>
