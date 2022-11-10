<template>
  <div class="third-tab cbg">
    <div class="has-data" v-if="title">
      <div class="title">{{ title }}</div>
      <div class="operate">
        <slot name="operate" />
      </div>
      <div class="third-tab-list">
        <slot name="list" />
      </div>
    </div>

    <div class="empty" v-else>
      <div class="image pic">
        <img src="@/assets/images/home/empty.png" alt="" />
      </div>
      <div class="name">暂无数据</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title?: string
}>()
</script>

<style scoped lang="less">
.third-tab {
  width: 100%;
  height: 100%;
  padding: 32px;

  .empty {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .image {
      width: 294px;
      height: 208px;
    }
    .name {
      margin-top: 32px;
    }
  }
  .title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
  .operate {
    height: 40px;
    margin-bottom: 32px;
  }
  .has-data {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .third-tab-list {
      flex: 1;
      height: 0px;
    }
  }
}
</style>
