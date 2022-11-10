<template>
  <div class="messageBox-wrap" v-if="showFlag">
    <div class="messagebox">
      <div class="header flex-start">
        <div class="tip pic">
          <img src="@/assets/images/home/tip.png" alt="" />
        </div>
        <div class="title">
          {{ title }}
        </div>
      </div>

      <div class="message">
        {{ message }}
      </div>
      <div class="btns flex-end">
        <div class="reset-btn" @click="cancel">否</div>
        <div class="search-btn ml16" @click="confirm">是</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    message: string
    confirm: () => void
    cancel: () => void
  }>(),
  {
    title: '标题',
    message: '111'
  }
)

const showFlag = ref(true)

const ok = () => {
  showFlag.value = false
}

defineExpose({
  ok
})
</script>

<style scoped lang="less">
.messageBox-wrap {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.3);
  .messagebox {
    width: 500px;
    height: 180px;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 16px;
    padding-left: 20px;

    .header {
      height: 20px;
      width: 100%;
      .tip {
        width: 20px;
        height: 20px;
      }
      .title {
        margin-left: 16px;
      }
    }
    .message {
      margin-top: 25px;
    }

    .btns {
      position: absolute;
      bottom: 16px;
      right: 16px;
      .ml16 {
        margin-left: 16px;
      }
    }
  }
}
</style>
