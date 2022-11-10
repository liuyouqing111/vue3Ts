<template>
  <div class="commonDrawer">
    <el-drawer v-model="drawer" direction="rtl" size="62.5%" destroy-on-close>
      <template #header>
        <h4>{{ title || '标题' }}</h4>
      </template>
      <template #default>
        <commonTabVue :title="tabTitle">
          <template #list>
            <el-row>
              <el-col
                :span="item.span"
                v-for="item in drawerConfig"
                :key="item.labelName"
                style="margin-bottom: 20px"
              >
                <div v-if="item.type === 'span'">
                  <span class="mr4">{{ item.labelName }} :</span> {{ defaultInfo[item.field] }}
                </div>

                <template v-if="item.type === 'status'">
                  <div>
                    <span class="mr4">{{ item.labelName }} :</span> {{ defaultInfo[item.field] }}
                  </div>
                </template>

                <template v-if="item.type === 'card'">
                  <div class="flex">
                    <span class="mr4">{{ item.labelName }} :</span>
                    <div class="cardlist flex">
                      <div class="item" v-for="citem in defaultInfo[item.field]" :key="citem">
                        {{ citem }}
                      </div>
                    </div>
                  </div>
                </template>

                <template v-if="item.type === 'images'">
                  <div class="flex">
                    <div class="left mr4">{{ item.labelName }} :</div>
                    <div class="right flex-start">
                      <div class="image" v-for="citem in defaultInfo[item.field]" :key="citem">
                        <div class="img pic">
                          <img :src="citem.url" alt="" />
                        </div>
                        <div class="mask" @click="open(citem.url)">
                          <div class="fdj pic cp">
                            <img src="@/assets/images/home/fdj.png" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <el-image-viewer v-if="dialogVisible" @close="close" :url-list="srcList" />
                </template>
              </el-col>
            </el-row>
          </template>
        </commonTabVue>
      </template>
      <template #footer v-if="showFooter">
        <div class="footer-btns">
          <div class="flex-start">
            <div class="cancel-btn">取消</div>
            <div class="confirm-btn">确认</div>
          </div>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import commonTabVue from '@/components/commonTab.vue'
import { ref } from 'vue'
import { IdrawerConfig } from '..'
const srcList = ref<any[]>([])
const dialogVisible = ref(false)

const props = defineProps<{
  title: string
  showFooter: boolean
  tabTitle: string
  defaultInfo: any
  drawerConfig: IdrawerConfig[]
}>()

const drawer = ref(false)

const open = (value: any) => {
  srcList.value = []
  srcList.value.push(value)
  dialogVisible.value = true
}

const close = () => {
  dialogVisible.value = false
}

const show = () => {
  drawer.value = true
}

defineExpose({
  show
})
</script>

<style scoped lang="less">
.commonDrawer {
  width: 100%;
  color: #333333;
  font-size: 14px;
  .mr4 {
    margin-right: 10px;
  }

  .cardlist {
    width: 560px;
    display: flex;
    flex-wrap: wrap;
    padding: 16px;
    background: rgba(52, 128, 198, 0.1);
    border-radius: 4px;
    .item {
      padding: 7px 16px;
      background: rgba(52, 128, 198, 0.3);
      border: 1px solid rgba(52, 128, 198, 0.5);
      border-radius: 4px;
      margin-right: 10px;
    }
  }

  ::v-deep(.el-drawer) {
    background-color: #f1f2f6;
    .right {
      flex-wrap: wrap;
      gap: 10px;
      flex: 1;
    }

    .image {
      width: 148px;
      height: 148px;
      border-radius: 4px;
      background-color: #333333;
      position: relative;
      .img {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      &:hover {
        .mask {
          display: block;
        }
      }
      .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        display: none;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 10;
        .fdj {
          width: 20px;
          height: 20px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    .el-drawer__header {
      height: 64px;
      margin-bottom: 0px !important;
      padding: 0px 24px !important;
      position: relative;
      background-color: #fff;
      h4 {
        font-size: 18px;
        color: #333333;
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
      // background-color: #fff;
      padding: 16px;
    }

    .el-drawer__footer {
      padding: 0 24px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .confirm-btn {
        margin-left: 16px;
      }
    }
  }
}
</style>
