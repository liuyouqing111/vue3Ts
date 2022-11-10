<template>
  <div class="my-table">
    <el-table
      stripe
      :highlight-current-row="highRow"
      :data="listData"
      :row-style="rowStyle"
      :header-cell-style="headerCellStyle"
      @selection-change="selectionChange"
      @row-click="rowClick"
      ref="mytabelRef"
    >
      <el-table-column type="expand" width="100" v-if="expand">
        <template #default="scope2">
          <slot name="chilrenTable" :scope="scope2" />
        </template>
      </el-table-column>
      <el-table-column v-if="showSelection" type="selection" width="100" :selectable="selectable" />
      <el-table-column v-if="showIndex" type="index" label="序号" fixed width="100" />

      <el-table-column
        v-for="item in tableConfig"
        :key="item.prop"
        :type="item.type"
        :prop="item.prop"
        :label="item.label"
        show-overflow-tooltip
        :width="item.width ? item.width : 'auto'"
        :fixed="item.fixed === 1 ? 'left' : item.fixed === 0 ? 'right' : false"
        :filters="item.filters"
        :filter-method="item.filterMethod"
      >
        <template v-if="item.type !== 'selection'" #default="scope">
          <slot v-if="item.slotName" :name="item.slotName" :scope="scope"></slot>
          <span v-else>
            {{ scope.row[item.prop as string] }}
          </span>
        </template>
      </el-table-column>
    </el-table>

    <div class="bottom" v-if="showPagination">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 15, 20, 25]"
        background
        layout="total,sizes, prev, pager, next"
        :total="total"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { ElTable } from 'element-plus'
import request from '@/service/index'
import { ref, computed, watch } from 'vue'
import { Idataconfig, rowStyle, headerCellStyle } from '..'

interface IMytable {
  showIndex: boolean
  tableConfig: Idataconfig[]
  queryInfo?: any
  url: string
  tableData?: any[]
  expand?: boolean
  showPagination: boolean
  highRow?: boolean
  showSelection?: boolean
  selectable?: (row: any, index: number) => boolean
}

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const props = defineProps<IMytable>()

const mytabelRef = ref<any>()

const rowClick = (row: any, column: any, event: any) => {
  emit('rowClick', row)
}
const emit = defineEmits<{
  (event: 'selectionChange', value: any): void
  (event: 'rowClick', value: any): void
}>()

const params = computed(() => {
  return {
    ...props.queryInfo,
    pageNum: currentPage.value - 1,
    pageSize: props.showPagination ? pageSize.value : 99999
  }
})

const listData = ref<any[]>([])

// const getListDeps = computed(() => {
//   return {
//     currentPage,
//     pageSize,
//     url: props.url
//   }
// })

const setCurrentRow = (row: any) => {
  mytabelRef.value?.setCurrentRow(row)
}

watch(
  () => {
    return params.value
  },
  () => {
    getList()
  },
  {
    deep: true
  }
)

const getList = async () => {
  let res
  if (props.url === '/consult/search' || props.url === '/insight/third/search') {
    res = await request.post<any>(props.url, params.value, {
      showLoading: true
    })
  } else {
    res = await request.get<any>(props.url, {
      params: params.value,
      showLoading: true
    })
  }

  listData.value = res.data?.list || res.data
  total.value = res.data?.total || res.data?.size || 0

  // console.log(props.url, params.value)
}

const resetSizeandPage = () => {
  currentPage.value = 1
  pageSize.value = 10
}

getList()

// const tableData: any[] = []

const selectionChange = (value: any) => {
  emit('selectionChange', value)
}

defineExpose({
  getList,
  resetSizeandPage,
  setCurrentRow,
  listData
})
</script>

<style scoped lang="less">
.my-table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .el-table {
    // height: calc(100% - 68px);
    flex: 1;
  }

  .bottom {
    height: 28px;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
