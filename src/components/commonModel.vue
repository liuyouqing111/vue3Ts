<template>
  <div class="common-model">
    <el-dialog v-model="dialogVisible" :title="title || '标题'" width="800px" destroy-on-close>
      <div class="form">
        <slot name="list" />
      </div>
      <template #footer>
        <div class="dialog-footer flex-start">
          <slot name="btns" />
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  title: string
}>()

const dialogVisible = ref(false)

const show = () => {
  dialogVisible.value = true
}

const close = () => {
  dialogVisible.value = false
}

defineExpose({
  show,
  close
})
</script>

<style scoped lang="less">
.common-model {
  .form {
    // padding: 0 200px !important;
  }
  ::v-deep(.el-dialog) {
    .el-dialog__header {
      border-bottom: 1px solid #e4e4e4;
      margin-right: 0px !important;
      height: 64px;
    }
    .el-dialog__body {
      padding: 0;
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
  }
}
</style>
