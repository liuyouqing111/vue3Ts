<template>
  <div class="myform">
    <el-form
      :model="formData"
      ref="ruleFormRef"
      :scroll-to-error="true"
      :label-width="myformCongig.labelWidth + 'px'"
      :label-position="myformCongig.labelPosition"
    >
      <el-row :gutter="myformCongig.gutter || 0">
        <el-col
          v-for="(item, index) in myformCongig.formItems"
          :key="index"
          v-bind="item.layout || myformCongig.layout"
        >
          <el-form-item :label="item.labelName" :prop="item.field" :rules="item.rules">
            <el-input
              v-if="item.type === 'input'"
              v-model="formData[item.field]"
              :placeholder="item.placeholder"
              :style="'width:' + item.width + 'px'"
              clearable
              :disabled="item.disabled || false"
            />
            <el-input
              v-if="item.type === 'inputNumber'"
              oninput="value=value.replace(/[^\-?\d.]/g,'')"
              v-model="formData[item.field]"
              :placeholder="item.placeholder"
              :style="'width:' + item.width + 'px'"
              clearable
              :disabled="item.disabled || false"
            />
            <el-input
              v-if="item.type === 'textarea'"
              v-model="formData[item.field]"
              type="textarea"
              :style="'width:' + item.width + 'px'"
              :maxlength="item.maxlength"
              :autosize="{ minRows: 4, maxRows: 6 }"
              :placeholder="item.placeholder"
              show-word-limit
            />
            <el-input
              v-if="item.type === 'password'"
              v-model="formData[item.field]"
              type="password"
              :placeholder="item.placeholder"
              clearable
              :disabled="item.disabled || false"
            />
            <el-select
              v-if="item.type === 'select'"
              v-model="formData[item.field]"
              :multiple="item.multiple || false"
              style="width: 100%"
              :placeholder="item.placeholder"
              :disabled="item.disabled || false"
              clearable
            >
              <el-option
                v-for="citem in item.options"
                :key="citem.value"
                :label="citem.label"
                :value="citem.value"
              />
            </el-select>
            <el-input-number
              v-if="item.type === 'sort'"
              v-model="formData[item.field]"
              :min="1"
              size="large"
              controls-position="right"
            />

            <el-date-picker
              v-if="item.type === 'timePicker'"
              v-model="formData[item.field]"
              style="width: 100%; height: 100%"
              :style="'width:' + item.width + 'px'"
              type="date"
              :editable="false"
              value-format="YYYY-MM-DD"
              :placeholder="item.placeholder"
              clearable
              :disabled="item.disabled || false"
            />
            <template v-if="item.type === 'uploadImages'">
              <el-upload
                v-model:file-list="formData[item.field]"
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :on-preview="handlePictureCardPreview"
                :disabled="item.disabled || false"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
              <el-image-viewer v-if="dialogVisible" @close="close" :url-list="srcList" />
            </template>

            <template v-if="item.type === 'uploadImage'">
              <el-upload
                class="upload-demo"
                drag
                action="#"
                multiple
                :auto-upload="false"
                :show-file-list="false"
                :on-change="
                  (file:any) => {
                    uploadImageUrl = toblob(file.raw)
                    formData[item.field]=file.raw
                    
                  }
                "
                :style="'width:' + item.width + 'px'"
              >
                <div
                  v-if="!uploadImageUrl && !formData[item.field]"
                  class="upload-icno"
                  :style="`width:100%;height:${item.height}px`"
                >
                  <div>
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">将文件拖到此处，或 <em>点击上传</em></div>
                  </div>
                </div>

                <!-- <template #trigger>
                    <div v-if="uploadImageUrl" class="uploadimage-view">
                      <img :src="uploadImageUrl" alt="" />
                    </div>
                  </template> -->
                <div v-else class="uploadimage-view" :style="`width:100%;height:${item.height}px`">
                  <img :src="uploadImageUrl || formData[item.field]" alt="" />
                </div>
                <template #tip>
                  <div class="el-upload__tip">支持扩展名：png、jpg、等文件</div>
                </template>
              </el-upload>
            </template>
            <template v-if="item.type === 'radio'">
              <el-radio-group v-model="formData[item.field]">
                <el-radio
                  v-for="citem in item.radioOptions"
                  :key="citem.label"
                  :label="citem.label"
                  >{{ citem.name }}</el-radio
                >
              </el-radio-group>
            </template>

            <template v-if="item.type === 'tree'">
              <el-tree
                :data="item.treeDate"
                show-checkbox
                default-expand-all
                node-key="perms"
                ref="treeRef"
                :default-checked-keys="[...formData[item.field]]"
                :props="item.treeProps"
                @check-change="formData[item.field] = treeRef[0].getCheckedKeys(false)"
              />
            </template>

            <template v-if="item.type === 'wangEditor'">
              <div style="width: 100%">
                <commonWangEditorVue
                  :html="formData[item.field]"
                  @change="
                    (value) => {
                      formData[item.field] = value
                    }
                  "
                />
              </div>
            </template>

            <template v-if="item.type === 'area'">
              <el-select
                v-model="formData[item.field].province"
                placeholder="请选择省"
                style="width: 15%; margin-right: 1.66%"
                :disabled="item.disabled || false"
              >
                <el-option
                  v-for="item in provinces"
                  size="small"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                  @click.native="changeProvince()"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="formData[item.field].city"
                placeholder="请选择市"
                :disabled="item.disabled || false"
                style="width: 15%; margin-right: 1.66%"
              >
                <el-option
                  v-for="item in cities"
                  size="small"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                  @click.native="changeCity"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="formData[item.field].area"
                placeholder="请选择区"
                :disabled="item.disabled || false"
                style="width: 15%; margin-right: 1.66%"
              >
                <el-option
                  v-for="item in area"
                  size="small"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>

              <el-input
                style="width: 50%"
                placeholder="请输入详细地址"
                :disabled="item.disabled || false"
                v-model="formData[item.field].address"
              >
              </el-input>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <slot name="bottom" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { IMyform } from '..'
import { Plus } from '@element-plus/icons-vue'
import { regionData } from 'element-china-area-data'
import { FormInstance, UploadProps } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import commonWangEditorVue from '@/components/commonWangEditor.vue'

const props = defineProps<{
  myformCongig: IMyform
  modelValue: any
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: any): void
  (event: 'success'): void
}>()

const obj = JSON.parse(JSON.stringify(props.modelValue))
const formData = ref(obj)
watch(
  () => formData.value,
  (newvalue) => {
    emit('update:modelValue', newvalue)
  },
  {
    deep: true
  }
)

const setFormData = (value: any) => {
  formData.value = value
}

const uploadImageUrl = ref<any>('')

const treeRef = ref<any>()

const toblob = (file: File) => {
  return window.URL.createObjectURL(file)
}

const getKeys = () => {
  //   log treeRef.value[0]?.getCheckedKeys(false)
}
// const selectProvince = ref('')
// const selectCity = ref('')
// const selectArea = ref('')
const provinces = ref(regionData)
const cities = ref<any[]>([])
const area = ref<any[]>([])

const srcList = ref<any[]>([])

const dialogVisible = ref(false)

const uploadImageChange = (file: any) => {
  uploadImageUrl.value = window.URL.createObjectURL(file.raw)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  // dialogImageUrl.value = uploadFile.url!
  srcList.value = []
  srcList.value.push(uploadFile.url)
  dialogVisible.value = true
}

const close = () => {
  dialogVisible.value = true
}

const changeProvince = () => {
  cities.value = []
  area.value = []
  formData.value.area.city = ''
  formData.value.area.area = ''
  let cityItem = provinces.value.filter((item: any) => {
    return item.label === formData.value.area.province
  })

  if (cityItem[0]) {
    cities.value = cityItem[0].children
  }
}

const changeCity = () => {
  area.value = []
  formData.value.area.area = ''
  let areaItem = cities.value.filter((item) => {
    return item.label === formData.value.area.city
  })

  if (areaItem[0]) {
    area.value = areaItem[0].children
  }
}

const ruleFormRef = ref<FormInstance>()

const submitForm = async () => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      emit('success')
    } else {
      // console.log('error submit!', fields)
    }
  })
}

defineExpose({
  submitForm,
  setFormData
})
</script>

<style scoped lang="less">
.myform {
  ::v-deep(.el-form) {
    .el-input__wrapper {
      min-height: 40px !important;
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 25px;
    }
  }
}
</style>
