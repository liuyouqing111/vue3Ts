<template>
  <div class="commonWangEditor">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="{}"
      mode="default"
    />
    <Editor
      class="editor"
      style="height: 300px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      mode="default"
      @onCreated="handleCreated"
      @onChange="change"
    />
  </div>
</template>

<script lang="ts" setup>
import { IDomEditor, IEditorConfig } from '@wangeditor/editor'
import { computed, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import request from '@/service/index'

import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import cache from '@/utils/cache'

type InsertFnType1 = (url: string, alt: string, href: string) => void
type InsertFnType2 = (url: string, poster: string) => void
const editorRef = shallowRef()
const valueHtml = ref('')

const route = useRoute()

const currentPath = computed(() => {
  return route.path
})

const path = computed(() => {
  let path = ''
  switch (currentPath.value) {
    case '/childCompany':
      path = '/about'
      break
    case '/companyProfile':
      path = '/about'
      break
    case '/team':
      path = '/team'
      break
    case '/services':
      path = '/service'
      break
    case '/insight':
      path = '/insight'
      break
    default:
      break
  }
  return path
})

const uploadFile = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return request.post<number>(path.value + '/upload', formData)
}

const downloadFile = (id: number) => {
  if (id) {
    return `${import.meta.env.VITE_BASE_URL}${path.value}/down?id=${id}&hefu=${cache.getKey(
      'token'
    )}`
  } else {
    return ''
  }
}

const props = defineProps<{
  html: string
}>()

watch(
  () => {
    return props.html
  },
  () => {
    valueHtml.value = props.html
  },
  {
    immediate: true,
    deep: true
  }
)

const emit = defineEmits<{
  (event: 'change', value: string): void
}>()
const editorConfig = ref<Partial<IEditorConfig>>({
  placeholder: '???????????????',
  MENU_CONF: {
    uploadImage: {
      async customUpload(file: File, insertFn: InsertFnType1) {
        const res = await uploadFile(file)
        const url = downloadFile(res.data!)
        insertFn(url, '', '')

        // TS ??????
        // async customUpload(file, insertFn) {                   // JS ??????
        // file ??????????????????
        // ???????????????????????????????????? url alt href
        // ??????????????????
        // insertFn(url, alt, href)
      }
    },
    uploadVideo: {
      async customUpload(file: File, insertFn: InsertFnType2) {
        const res = await uploadFile(file)
        const url = downloadFile(res.data!)
        // TS ??????
        // async customUpload(file, insertFn) {                   // JS ??????
        // file ??????????????????
        // ???????????????????????????????????? url poster
        // ??????????????????
        insertFn(url, '')
      }
    }
  }
})

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor // ?????? editor ??????????????????
}

const change = (editor: IDomEditor) => {
  emit('change', editor.getHtml())
}

defineExpose({
  valueHtml
})
</script>

<style scoped lang="less">
.commonWangEditor {
  width: 100%;
  border: 1px solid #e4e4e4;
  ::v-deep(.editor) {
    video {
      max-width: 100%;
      object-fit: fill;
    }
  }
}
</style>
