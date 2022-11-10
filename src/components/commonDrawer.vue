<template>
  <div class="commonDrawer">
    <el-drawer v-model="drawer" direction="rtl" size="62.5%" destroy-on-close @closed="close">
      <template #header>
        <div class="title">{{ title || '标题' }}</div>
      </template>
      <template #default>
        <div class="edit-content cbg specialThumb">
          <div class="content">
            <slot name="content" />
          </div>
          <div class="footer-btns flex-around" v-if="showFooter">
            <div class="flex-start">
              <div class="cancel-btn" @click="cancel">取消</div>
              <div class="confirm-btn ml10" @click="confirm">确认</div>
            </div>
          </div>
        </div>
      </template>
      <!-- <template #footer v-if="showFooter">
        <div class="footer-btns">
          <div class="flex-start">
            <div class="cancel-btn" @click="cancel">取消</div>
            <div class="confirm-btn" @click="confirm">确认</div>
          </div>
        </div>
      </template> -->
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  title: string
  showFooter: boolean
  tabTitle?: string
}>()

const emit = defineEmits<{
  (event: 'closed'): void
  (event: 'confirm'): void
}>()

const close = () => {
  emit('closed')
}
const drawer = ref(false)

const show = () => {
  drawer.value = true
}

const cancel = () => {
  drawer.value = false
}

const confirm = () => {
  emit('confirm')
}

defineExpose({
  show,
  cancel
})
</script>

<style scoped lang="less">
.commonDrawer {
  ::v-deep(.el-drawer) {
    background-color: #f1f2f6;

    .edit-content {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      padding: 32px;
      .footer-btns {
        margin-top: 30px;
      }

      .content {
        min-height: calc(100% - 72px);
      }
    }

    .el-drawer__header {
      height: 64px;
      margin-bottom: 0px !important;
      padding: 0px 24px !important;
      position: relative;
      background-color: #fff;
      .title {
        font-size: 18px;
        color: #333333;
        text-align: center;
      }
      .el-drawer__close-btn {
        position: absolute;
        right: 14px;
        width: 43px;
        height: 43px;
        background-color: #e5e5e5;
        border-radius: 22px;
      }
    }

    .el-drawer__body {
      padding: 32px;
    }
  }
}
</style>
